Webauthn Guide
==============

Utilities
---------

The interface to deal with the creation and usage of credentials are mostly relying on binary data objects.
Sometimes 

Registration
------------

### Flow

### Create credentials

### Raw Response

### Attestation

![attestation](img/attestation.png)
(from https://w3c.github.io/webauthn/#sctn-attestation)

### Decoded Response

Login
-----



The big picture
---------------

Keep in mind that the protocol is not trivial and that the whole system around must be sound.
It requires that all aspects are correctly implemented in order for the whole to be secure.

This includes mainly:

- proper "flow"
- proper random challenges and verifications
- proper validation of signatures and payloads on server side
- the ability to manage multiple device bound credentials per user

There are also a couple of libraries which can assist you:

- ...

Or just use this service, to basically get it all right away, nice and secure. ;)