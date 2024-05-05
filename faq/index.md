For Devs
========

Is it "production-ready"?
-------------------------

Let's be honest, it is **not** *yet*. It works, it's secure, it's usable,
but it is still slightly incomplete and lacks the polish to really use it in production right now. 
It's more in a proof-of-concept stage than a finished service.

Is it scalable?
---------------

**Yes**, it is. We use so called "edge computing" and a distributed database. Basically, the code is distributed on hundreds of data-centers around the globe and the code invoked on-demand. This ensures infinite scalability, elasticity to handle bursts and optimal latency for every location.

Who are we?
-----------

Let's not beat around the bush, the "*we*" is an "*I*". That's right, this is a solo endeavor. Who am I?
Arnaud Dagnelies, a senior software developer in the fortys, living in Germany, having programmed since high-school.

Why is it better than rolling your own?
---------------------------------------

There are two reasons for this. The first is that it's a lot of work rolling your own. It's not just understanding and invoking the complex WebAuthn protocol.
It's managing fallbacks in case the browser does not support it, recovery mechanisms, enrolling multiple devices, managing the profile, ensuring security, updates...

The other is related to user comfort. Since the WebAuthn/Passkeys protocol is device/account bound, the user has to register multiple devices ...and it's no fun to do that for every website. It's much more comfortable to do it in a single place. That's why I'm convinced the "Sign in with ..." will remain more popular than "Duh, I have to register my devices here again".


How can this be free?
---------------------

It is our conviction that making it publicly available is the best way to make the internet a safer place as a whole.
We want to keep it free for everyone and forever without catch.

However, being free is not sustainable in the long term. We need food on the plate. [Sponsors welcome!](https://github.com/sponsors/passwordless-id)


For Users
=========

Is it secure?
-------------

Yes, it is. Security comes from multiple aspects, but the core is the protocol.
You basically require a key stored on your device (*) and a local user verification to sign in.
This results in a two-factor authentication in a single step:

- Something you have
- Something you are or know (in case of biometric or PIN verification)

In a later stage, it's also planned to add further security using an optional third factor: your location.


(*) Is it really device bound?
------------------------------

Yes and no. The underlying WebAuthn protocol enables us to "prefer" device-bound credentials but not enforce it.
As of speaking, Windows, Android, Linux and USB keys do use device-bound credentials.
On the opposite, Apple always syncs the credentials on all your devices, like password managers.


What if I lose my device?
--------------------------

Passwordless.ID enables you to register multiple devices from multiple operating systems.
Adding a device is as simple as scanning a QR code or clicking on a link received per e-mail.

However, *if* you loose all your registered devices *and* have no recovery mechanisms in place (like an e-mail or SMS), then yes, you inccur the risk of locking yourself out of your account. Therefore, we highly recommend to register multiple devices or fill e-mail and phone number in your profile.


What about privacy?
-------------------

We do not use, resell nor exchange your data with anyone else.
Everything that you write here stays here, except if you give explicit consent to share part of your profile information with another website.
We do not track (yet) your activity (like when you sign-in and from where), but we plan to do so in the future for the sole purpose of intrusion attempts detection and boosting security even further. Like before, this data will not be sent to any third-party.


