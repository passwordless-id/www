```
title Passwordless Authentication

actor User

==Registration==
Browser->Server: I want to register!
Browser<<--Server: Please send me a public key
Browser->User: TouchId, FaceId or Device PIN
User-->Browser: OK
Browser->Browser: Cryptographic key pair created
Browser->Server: Send public key
Browser<<--Server: Device regsitered!


==Authentication==
Browser->Server: I want to login!
Browser<<--Server: Please sign this challenge
Browser->User: TouchId, FaceId or Device PIN
User-->Browser: OK
Browser->Browser: Challenge signed with private key
Browser->Server: Send signed challenge
Server->Server: Verify signature using public key
Browser<<--Server: Welcome!
```

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
