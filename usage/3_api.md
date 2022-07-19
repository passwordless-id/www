API
===

It is possible to develop your own UI and use this API as backend.
Cross-origin requests *will* be accepted and the user credentials will be kept separate for your domain.

Let us just see how it works by example.

Registration
------------

A new user comes to your website and wants to register its device.

    POST /register
        {"email":..., "confirmUrl": ...}

When invoking this endpoint, an e-mail will be sent to the user containing a link with a challenge.

    {{confirm-url}}#challenge={{challenge}}


Once verified, it triggers the device authentication and the creation of credentials which will be sent using:

    POST /add-device
        {"email"..., "challenge": ..., "publicKey":..., "publicKeyAlgo":..., }


Authentication
--------------

    GET /challenge?email=...

    POST /login
        {...}