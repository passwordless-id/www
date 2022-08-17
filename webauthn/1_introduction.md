Overview
========

How does it work?
-----------------

### Registration

1. A challenge (webauthn vocabulary for a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) is generated server-side
2. The user is prompted to enter biometrics (fingerprint/face) or pin/password of the device
3. A cryptographic key pair is created
4. The public key (among others) is sent to the server
5. The server verifies the challenge, optionally verifies the attestation and stores the public key

### Authentication

1. A challenge is generated server-side
2. The user is prompted to enter biometrics (fingerprint/face) or pin/password of the device
3. The private key is used to sign the message including the challenge
4. The server verifies the challenge and the signature using the previously stored public key


Specifications
--------------

The [Official Specification](https://www.w3.org/TR/webauthn/) is authored by a W3C group.

Useful websites:

- https://github.com/w3c/webauthn
- https://webauthn.io
- https://webauthn.guide
- https://webauthn.me

> DISCLAIMER
> 
> - Do not expect something simple.
> The specification itself is large, complex and with many details to consider.
> - Do not expect something stable either.
> This combines the effort of various browsers, platforms, vendors and is still in a state of flux.
> The specification is still evolving and reality might diverge from expectations.


Introduction
------------

The basic flow may look as follows.

![Overview diagram](overview.svg)
