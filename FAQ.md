FAQ
===

Security & Privacy
------------------

### Is it really more secure?

The secret keys stored on the device are specific to the user and the website, and their access is protected by either biometrics or PIN code.

In other words, even if your device is stolen, you could not be impersonated, except if they also know your PIN.

It is a two factor authentication in a single step. The first factor is something you have (the device) and the other is something you are (using fingerprint or face recognition) or alternatively something you know (device's PIN code).

Let's quickly review how it protects against common security threats.

#### Phishing

#### Reuse of credentials

#### Hacked servers



### What if I loose my device?


### What about privacy?

How can I use it?
-----------------

When will it be launched?
-------------------------

How much does it cost?
----------------------

Can I implement it myself?
--------------------------

Sure! Please note that the protocol is not trivial though.

Here are some tips on the road. Since unlike traditional authentication the fundamental way to use it is different and more complex in several aspects.

- You do not store a (hashed) password, but you manage a set of registered devices (secrets) for the user.
- the registration/authentication process occurs in two steps.
  - first, the client requests a challenge
  - then, the clients sends a signed payload including this challenge as proof
- proper validation of the registration payload is fairly complex
- you still need the logic to validate emails/phones and account recovery

I recommend to check my tutorials for a starting point:

- ...

There are also a couple of libraries which can assist you:

- ...

Or just use this service, to basically get it all right away, nice and secure. ;)