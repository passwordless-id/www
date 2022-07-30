Registration
============

* Table of Content
{:toc}

Example
-------

Simply open the browser dev tools and run it in the console!

```js
let publicKey = {
    challenge: Uint8Array.from("random-server-challenge", c=>c.charCodeAt(0)),
    rp: {
        name: "Name of the website/app/company"
    },
    user: {
        id: Uint8Array.from("some-unrecognizable-user-id", c=>c.charCodeAt(0)),
        name: "john.doe@example.com",
        displayName: "John Doe",
    },
    pubKeyCredParams: [] // if empty, either ES256 or RSA256 will be used by default
};

// Note: The following call will cause the authenticator to display UI.
let registration = await navigator.credentials.create({ publicKey })
```

There are many more options that can be used. This solely describes the most basic use case.
If you run this snippet, a browser specific popup should appear and will ask to proove your identity. In my case (german locale) in looks like this:


![registration example](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fapvecktcu1pohn61lwy.png) 


Depending on your case, you might use the device directly, your smartphone nearby, or some security key to proove your identity using it.

How exactly you prove your identity depends on the device capabilities, the OS, the browser... At some point, you will to either use some biometric or PIN on the device. This device is then called the "authenticator" and will produce a cryptographic private/public key pair.

The private key will be kept secret, stored on the device and protected by your biometric or PIN code. The public key will ulimately be sent to the server so that it can authentify you next time.

So, what's the result of this call? A "PublicKeyCredential" and the start of your headhaches. ;) It's not some JSON that you can send over, it's an object with encoded byte buffers.

```js
PublicKeyCredential {
   id: 'AQtKmY-...',
   rawId: <ArrayBuffer>,
   response: {
       attestationObject: <ArrayBuffer>,
       clientDataJSON: <ArrayBuffer>
   }, 
   authenticatorAttachment: 'cross-platform',
   type: 'public-key'
}
```

This is also an object with additional methods.
Most notably, the most important pieces of information are:

- `registration.id`: The id of the key pair
- `registration.response.getPublicKeyAlgorithm()`: An integer representing the signing algorithm
- `registration.response.getPublicKey()`: An "ArrayBuffer" representing the public key

To see how a "partly decoded" object looks like, I advise the [webauthn debugger](https://webauthn.me/debugger)

    "rawId": "96315fc2ea397d6be497190b1bfecbc6b0841411798a2fbeddffc79682c07e73",
    "id": "ljFfwuo5fWvklxkLG_7LxrCEFBF5ii--3f_HloLAfnM",
    "type": "public-key",
    "response": {
        "clientDataJSON": {
          "type": "webauthn.create",
          "challenge": "Dx9AmkuTB-8bnqwcf-yJw1FFUVKRubXJQJt-zwyF3Io",
          "origin": "https://webauthn.me",
          "crossOrigin": false
        }
        attestationObject: {
          "fmt": "none",
          "attStmt": {},
          "authData": {
            "rpIdHash": "f95bc73828ee21f9fd3bbe72d97908013b0a3759e9aea3dae318766cd2e1ad",
            "flags": {
              "userPresent": true,
              "reserved1": false,
              "userVerified": true,
              "reserved2": "0",
              "attestedCredentialData": true,
              "extensionDataIncluded": false
            },
            "signCount": 0,
            "attestedCredentialData": {
              "aaguid": "0000000000000000",
              "credentialIdLength": 32,
              "credentialId": "96315fc2ea397d6be49719b1bfecbc6b0841411798a2fbeddffc79682c07e73",
              "credentialPublicKey": Download COSEDownload JWKDownload PEM {
                "kty": "RSA",
                "alg": "RSASSA-PKCS1-v1_5_w_SHA256",
                "n": "nej5Mk1AXDOUmETMPyy/b75p1+AxrHPO1yDyS8sirUhya86XjU5hcXFAR0/nmNEHaBhpZWpHm2Ni7YUiUJt2/al1ESiq48IrVlbJn7vQqPj/L9Jr/8ZDIlutN9JbTzEsf/6xh5lnWI3A68sFg3rld0Dx0f0rk2HKGsO8iUMLsqzI2Fqnh0wGGgPFsyBMZYnH7orBD8Ok1aFz8tXyUqda5bHURcA8vI/yoOuHAIyAuRJDtkgyNCk+xxIlAitVeIqcjjT9NFiXGxQrJZIsZafkLK6DVCT+XkpSMJXv1+nwPV4zlT9drVv6zNsDLFtty0Je1jWx82QPAXmlhcoo0WqUxw==",
                "e": "AQAB"
              }
            }
          }
        }
    }

The credential ID is identified by `id` (base64url encoded) and `rawId` (raw byte buffer).
They are just two representations of the same value: `id === base64url(rawId)`.

This is just to give you a feeling of the response.
In particular, the *attestation* part is even more complex since its format and content are vendor-specific.

- `decode(cred.response.getAuthenticatorData()).attestedCredentialData.aaguid`: The authenticator ID
    - Only available if attestation was required
    - List of authenticators https://fidoalliance.org/metadata/



The flow
--------

![Registration flow diagram](registration.svg)



Creating a new key pair
-----------------------

This is done using [navigator.credentials.create]()(...)

The provided object is a [PublicKeyCredentialCreationOptions](https://w3c.github.io/webauthn/#dictdef-publickeycredentialcreationoptions)
    
    let publicKeyCredentialCreationOptions = {
        "rp":{
          "id": "login.example.com", // The domain name (the default) or a suffix of it (without port) in case the credential should be used for multiple subdomains.
          "name":"ACME Corporation" // (*required) For example, "ACME Corporation", "Wonderful Widgets, Inc." or "ОАО Примертех".
        },
        "user": {
            "id": buffer("rand0m..."), // (*required) A user handle is an opaque byte sequence with a maximum size of 64 bytes, and is not meant to be displayed to the user.
            "name": "alexm", // (*required) A human-palatable identifier for a user account. It is intended only for display, i.e., aiding the user in determining the difference between user accounts with similar displayNames. For example, "alexm", "alex.mueller@example.com" or "+14255551234".
            "displayName": "Alex Müller" // (*required) A human-palatable name for the user account, intended only for display. For example, "Alex Müller" or "田中倫". 
        },
        "challenge": buffer("rand0m..."), // (*required)
        "pubKeyCredParams": [{
            "alg": -257,
            "type": "public-key"
        }]
        "timeout": 60000,
        "excludeCredentials": [{
            "type": "public-key",
            "id": buffer("ljFfwuo5fWvklxkLG..."),
            "transports": [""]
        }],
        "authenticatorSelection": {
            "authenticatorAttachment": "platform" // or "cross-platform",
            "residentKey": "deprecated?",
            "requireResidentKey": false,
            "userVerification": "preferred" // or "required", "preferred", "discouraged"
        }
        "attestation": "none", // or "direct", "indirect"
        "extensions": {}
    };

Required parameters:


Validating the data
-------------------

The validation procedure is described [here](https://w3c.github.io/webauthn/#sctn-registering-a-new-credential)
in a currently **26 steps procedure**.

> This is quite ironic since none(*) of the data received is signed.
> It is also trivial for the client to manipulate the data in the absence of a signature.
> (*) The only thing that possess a signature is the *attestation*.
> However, it is not even guaranteed to be provided, like for Apple devices and apparently also google passkeys.
> So, basically, all the information you receive is taken in good faith.
> It is more a format validation than anything.

Since no signature is present, the need to validate the data is questionable.

What you will need though is the following:

- verify the challenge matches
- add the id, publicKey and publicKeyAlgo to the list of the user's trusted credentials


The attestation
---------------

The attestation can be used to identify the device model and its authenticity.
This is useful in high-security contexts for example,
where you want to restrict access to certain devices models only.

It is also not guaranteed to be provided by all authenticators. 
For example Apple devices and Google passkeys do not provide attestation at all.

The attestation is represented by the following binary CBOR (Compact Binary Object Representation) encoded structure.

![attestation](img/attestation.png)
(from https://w3c.github.io/webauthn/#sctn-attestation)

Attestation verification is also *hard*. 
Not only is the attestation statement encoded in an unusual format, it also differs from vendor to vendor.
Lastly, you will have to also validate the certificate chains, 
which are not always public,
so you might need to contact the security key manufacturers to even properly do this.

