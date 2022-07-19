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
- `excludeCredentials: ["credentialId1", "credentialId2"]`: this can be used to
- `timeout: 60000`: in milliseconds
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

(*) The *attestation* can be used to prove the authenticity of the authenticator model and flags (like userVerified).
This is only part of the response if the parameter `attestation: true` was used.
Please also note that the attestation may not bc available on all platforms, like apple.


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
  "credentialId": "B9mTcFSck2LzJO...",
  "signature": "9abaf3d0ea737...",
  "userHash": "SHA256 of username",
  "clientDataRaw": "base64 encoded raw JSON of clientData",
  "clientData": {
        "type": "webauthn.get",
        "challenge": "tV8VrRgHF2su...",
        "origin": "https://...",
        "crossOrigin": false
      }
    }
}
```
