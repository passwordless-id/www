
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
