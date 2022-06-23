https://sequencediagram.org/

```
title Creating Key Pair

participant Server

Browser->Server: Hey, I want to register!
Browser<<--Server: Sure, here is some challenge
Browser->Authenticator: Create a Key Pair please
Authenticator->Authenticator: Requires biometric or device PIN
Authenticator->Authenticator: Stores private key on device
Browser<<--Authenticator: Public key + signed challenge 
Browser->Server: Public key + signed challenge
Browser<--Server: Registration complete
```
