Registration
============

![Registration flow diagram](registration.svg)

```
title Webauthn Registration

actor User
participant Authenticator

Browser->Server: I want to register!
Browser<<--Server: challenge
note over Browser: credentials.create(...)
activate Browser
Browser->Authenticator: Create key pair
Authenticator->User: Request biometrics or device PIN
Authenticator<<--User: Done
Authenticator->Authenticator: User verified
Authenticator->Authenticator: Cryptographic key pair stored
Authenticator-->>Browser: Key pair and \ndevice attestation
deactivate Browser
Browser->Server: Send public key, \nchallenge and \nattestation
Server->Server: Verify challenge
Server->Server: Check attestation
Server->Server: Store public key
Browser<<--Server: Device regsitered!
```
