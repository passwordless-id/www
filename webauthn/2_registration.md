Registration
============

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

How exactly you prooe your identity depends on the device capabilities, the OS, the browser... At some point, you will to either use some biometric or PIN on the device. This device is then called the "authenticator" and will produce a cryptographic private/public key pair.

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

To see how a "partly decoded" object looks like, I advise the [webauthn debugger](https://webauthn.me/debugger)

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
          "name":"ACME Corporation" // (*) For example, "ACME Corporation", "Wonderful Widgets, Inc." or "ОАО Примертех".
        },
        "user": {
            "id": buffer("rand0m..."), // (*) A user handle is an opaque byte sequence with a maximum size of 64 bytes, and is not meant to be displayed to the user.
            "name": "alexm", // (*) A human-palatable identifier for a user account. It is intended only for display, i.e., aiding the user in determining the difference between user accounts with similar displayNames. For example, "alexm", "alex.mueller@example.com" or "+14255551234".
            "displayName": "Alex Müller" // (*) A human-palatable name for the user account, intended only for display. For example, "Alex Müller" or "田中倫". 
        },
        "challenge": buffer("rand0m..."),
        "pubKeyCredParams": [{
            "alg": -257,
            "type": "public-key"
        }]
        "timeout": 60000,
        "excludeCredentials": [{
            required DOMString                    type;
            required BufferSource                 id;
            sequence<DOMString>                   transports;
        }],
        "authenticatorSelection": {
            authenticatorAttachment: "platform"|"cross-platform",
            DOMString                    residentKey;
            boolean                      requireResidentKey = false;
            DOMString                    userVerification = "preferred"; // "required", "preferred", "discouraged"
        }
        DOMString                                    attestation = "none";
        AuthenticationExtensionsClientInputs         extensions;
    };

Required parameters:


Validating the data
-------------------


![attestation](img/attestation.png)
(from https://w3c.github.io/webauthn/#sctn-attestation)