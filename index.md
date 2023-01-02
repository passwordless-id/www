---
title: Passwordless
subtitle: Authentication using TouchID or FaceID for everyone. Less passwords, more security!
---

<link rel="stylesheet" href="index.css">

Passwordless
============

<center>
> Less passwords, more security!
</center>

![Banner](img/banner-biometric-auth.svg)


<iframe src="form.html" style="width:100%; height:300px; border:none;"></iframe>


---


<img class="big-icon" src="img/features/icon-target.svg" />


The vision
----------

"Passwordless.ID" is meant to be a "free public identity provider" with the following philosophy.

- Make the web a safer place
- Make it easier for developers
- More comfort and control for users

This is achieved by providing tools and services to delegate the authentication to the Passwordless.ID API.

**Please note that this is currently *in development*!**

---


<img class="big-icon" alt="banner" src="img/features/safety-box.svg" />

Your fingerprint/face never leaves your device
----------------------------------------------

The biometric verification uses the *local authentication* mechamism from your device. On the device, these biometric information is strongly protected and never exposed.

The verification is a safety measure used to prove you are you, then create or access cryptographic keys stored on your device. These keys, also known as passkeys, are in turn used for the authentication mechanism.


---


<img class="big-icon" alt="banner" src="img/features/Protection.svg" />

More secure than passwords
--------------------------

It is basically *two factor authentication* in a *single step*.

- The first factor is something you have. 
The authentication only works on registered devices. 
- The second factor is something you are, or something you know. 
A biometric verification, or the device PIN code, is required.

The combination of both is required in order to authenticate the user.


---

<img class="big-icon" alt="banner" src="img/features/Lock-Pattern.svg" />

You can choose <i>not to use</i> fingerprint/face
-------------------------------------------------

The user verification is delegated to your platform. If you are uncomfortable with such a mechanism, you can still use a PIN, a password, a swipe pattern configured, or whatever is configured on your device as local authentication mechanism.


---


<img class="big-icon" alt="banner" src="img/features/Phishing-Attack.svg" />

It protects you from phishing
-----------------------------

Phishing usually involves the user into typing its password into a fake website, or other approaches like social engineering. It is the most common way to hack accounts.

By getting rid of passwords, you get rid of phishing! Great, right?

Moreover, it also protects against further security threats like password reuse and even data breaches! It is one of the most secure mechanisms available.


---


<img class="big-icon" alt="banner" src="img/features/innovation.svg" />

How does it work exactly? 
-------------------------

The authentication relies on a recent browser protocol called [webauthn](/protocols/webauthn/1_introduction) which is based on [asymetric cryptography](https://en.m.wikipedia.org/wiki/Public-key_cryptography). 

Upon registration, a cryptographic key pair is generated for the user.
The private key is stored on the device, protected by local authentication, while the public key is sent to the server.

When a user wants to authenticate themselves, they must sign a random "challenge" using their private key. This signature is sent to the server, which verifies it using the user's public key. 


---

<img class="big-icon" src="img/features/life-buoy.svg" />

What if I lose my device? 
-------------------------

Unlike traditional authentication systems that can be accessed from anywhere using a single password, authentication here is device bound.
Losing a device means losing the private key used to sign in.

That is why Passwordless.ID allows to register multiple devices per user. It is both more convinient and safer.

The user can also choose the recovery options it may accept, or how it authorizes to register a new device. Per other registered device, per SMS or per email. The latter one being convinient but less secure.

Likewise, if your device is stolen or has a risk of being compromised, it can be blocked.


---


<img class="big-icon" alt="banner" src="img/features/API-Integration.svg" />

OAuh2 / OpenID compatible
-------------------------

Passwordless.ID is compatible with both *OAuth2* and *OpenID* protocols. That way, you can use it as a generic OpenID provider for a "Sign in with..." button.

If you are familiar with OAuth, you probably know that it is an "authorization" protocol. Usually, the API also offer a set of operations to grant permission to. In the case of Passwordless.ID, the only operation is accessing (part of) the user profile.

Moreover, since the only available operation is accessing the user profile, and the fact that it is a public service, it allows some simplifications. In particular, you will not need a `client_id` nor a `client_secret`. That way, you can start using a "Sign in with Passwordless.ID" button without the need to register anything.


---


<img class="big-icon" src="img/features/icon-button.svg" />

Sign in with...
---------------

Passwordless.ID is compatible with OAuth2/OpenID and can be used out-of-the-box. You do not even need an account.

TODO: provide an example

For an even smoother integration, you can use the [@passwordless-id/connect](https://github.com/passwordless-id/connect) library. This library makes it possible to trigger the authentication/authorization using a single call.


```js
// Fetch user profile and `id_token`
const user = await connect.auth({scope: 'openid avatar email'})
```

And can be used to fetch the user profile and `id_token` afterwards.

```js
// Fetch user profile and `id_token`
const user = await connect.id({scope: 'openid avatar email'})
```

The `id_token` is a [Json Web Token](https://jwt.io) containing the user profile alongside a signature. This signature can be verified on the server side to prove the user's authenticity.

There is also a [standalone demo](https://passwordless-id.github.io/demo/) if you prefer. Note that it does not work in codepen or similar editor because they are contained within IFrames.


---


Get started now
---------------

Accessing the profile is as simple as calling `GET /userinfo`. See for yourself: https://api.passwordless.id/openid/userinfo

The response is something like this:

    {
      "sub": "myusername",
      "nickname": "My Nickname",
      "picture": "https://ui.passwordless.id/avatars/andy.svg",
    }

Of course, this works only if:

- the user is signed in (Otherwise you receive `401 Unauthorized`)
- The user ganted access (Otherwise you receive `403 Forbidden`)

In order to let the user sign in or grant access, simply invoke `https://api.passwordless.id/authorize`.

You might also request access to a larger scope, like phone number, personal information, address...

You can also request a JWT using `GET /token` to obtain the same information as a signed token. This token is particularly useful for the server side, since the JWT signature proves the user information authenticity.

Find more information about its usage here.


Are you a developer? Help us make the world more secure and use this! It is really simple.

You can use the "Sign in" button on your own website directly. No account required, not even an email. This is a "public" identity provider. Everyone can use it as much as they want.


---


<img class="big-icon" src="img/features/customer-experience.svg" />

If you like it, share it!
-------------------------

This was made with love, sweat and considerate thoughts. We strive to make the best possible authentication experience and are glad to hear any feedback.

If you like it too, talk about it to others! Share it with someone! Every little act is of great help to make it succeed. Thank you!

In the case you plan to write a blog article, a tutorial, some news or anything alike, we would be glad to hear from you. Perhaps we can feature it on our blog!