JS Lib
======

This small library is an opinionated wrapper around webauthn, simplifying its usage.


Availability Check
------------------

The first thing to do might be to check if the browser/platform supports passwordless authentication or not.
This can be done as follows.

```js
let res = passwordless.isAvailable()
```

It is also possible to find out if the device itself can be used as authenticator.

```js
let res = await passwordless.isLocal()
```



Creating credential
-------------------

```js
let cred = await passwordless.signUp({
    challenge: "random-string-from-server",
    username: "Johny"
})
```

Optional parameters include:

- `useExternDevice: true`: Set this flag to `true` to use an extern authentication device.
- `excludeCredentials: ["credentialId1", "credentialId2"]`: this can be used to avoid re-registering key pairs that already exist.
- `timeout: 60000`: in milliseconds (1 minute by default)
- `attestation: true`: adds a device "attestation" to the result.

The result will be as follows.

```json
{
  "challenge": "random-string-from-server",
  "username": "Johny",
  "credentialId": "B9mTcFSck2LzJO...",
  "publicKey": "base64-encoded-public-key",
  "publicKeyAlgo": "RS256|ES256",
  "authenticator": "Windows Hello Hardware Authenticator",
  "attestation": "base64-CBOR-encoded-attestation-object (*)"
}
```

> (*) The *attestation* is a complex structure that can be used to identify the device model and prove its authenticity.
> There is a nice article [here](https://medium.com/webauthnworks/webauthn-fido2-demystifying-attestation-and-mds-efc3b3cb3651) describing it in more details.
> This is typically used in high-security contexts, where the relying party wants to control which device models are allowed. 


Authentication
--------------

```js
let cred = await passwordless.signIn({
    challenge: "random-string-from-server",
    username: "Johny",
    credentialIds: ["credentialId1", "credentialId2"]
})
```

Optional parameters include:

- `timeout: 60000`: in milliseconds


The result will be as follows.

```json
{
  "challenge": "random-string-from-server",
  "username": "Johny",
  "credentialId": "B9mTcFSck2LzJO...",
  "clientData": "base64 encoded JSON (*)",
  "signature": "9abaf3d0ea737..."
}
```

The `clientData` contains a UTF-8 JSON string encoded in base64. Once decoded, it has the following structure.

```json
{
  "type": "webauthn.get",
  "challenge": "tV8VrRgHF2su...",
  "origin": "https://...",
  "crossOrigin": false
}
```



Server side validation
----------------------

In order to confirm the validity of the response server side, the following steps must be applied.

- ensure the `challenge`, `username` match the expected ones
- ensure the `credentialId` belongs to `username`
- load the corresponding `publicKey` and `publicKeyAlgo` stored during registration
- ensure the `signature` of `clientData` is valid
- ensure the content of the decoded `clientData` is correct
  - `type` is always `"webauthn.get"`
  - `challenge` must match
  - `origin` must match
  - `crossOrigin` must match according to use case
