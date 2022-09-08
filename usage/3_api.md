API
===

It is possible to develop your own UI and use this API as backend.
Cross-origin requests *will* be accepted and the user credentials will be kept separate for your domain.

Let us just see how it works by example.

Creating account
----------------

A new user comes to your website and wants to register.

    POST /register
        {"email":..., "confirmUrl": ...}

When invoking this endpoint, an e-mail will be sent to the user containing a link with a code.

    GET /confirm#code={{code}}

The code is there to verify you obtained the email and consumed upon usage to avoid replay attacks.
Once called that way, a temporary user session is established.


Registering a device
--------------------

Althought the first step of creating an account is registering the device, it can also be done independently, for multiple devices.
Therefore, a more general apprach is taken here.

    GET /challenge?email=...

Once verified, it triggers the device authentication and the creation of credentials which will be sent using:

    POST /add-device
        {"email"..., "challenge": ..., "publicKey":..., "publicKeyAlgo":..., }


Authentication
--------------

    GET /challenge?email=...

    POST /login
        {...}


Updating profile
----------------

