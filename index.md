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


<img class="big-icon" src="img/features/icon-button.svg" />

Sign in with...
---------------

Passwordless.ID is a public identity provider that can be used out-of-the-box and compatible with OAuth2 / OpenID. 

<link href="css/sign-in-with.css"  rel="stylesheet" />

<div id="demo">
<div id="spinner" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
</div>

<button id="sign-in" hidden class="btn btn-default" onclick="onClickSignIn()">Sign In (click me!)</button>

<section id="profile" class="card shadow profile" hidden>
    <div class="card-body">
        <img id="picture"/>
        <h3 id="nickname">Nickname</h3>
    </div>
</section>

<section id="output" class="card shadow container" hidden>
    <div class="card-body">
        <pre><code></code></pre>
    </div>
</section>

<button id="sign-out" class="btn btn-default" onclick="onClickSignOut()" hidden>Sign Out</button>
</div>

<script type="module" src="js/sign-in-with.js"></script>

For a straightforward and smooth integration, you can use the [@passwordless-id/connect](https://github.com/passwordless-id/connect) library. This library makes it possible to trigger the authentication/authorization using a single call.

Check out the [standalone demo](https://passwordless-id.github.io/demo/) to try it out and the [user guide](usage/sign-in-with) to implement this on your site in 5 minutes! No account necessary!


---


<img class="big-icon" alt="banner" src="img/features/Safety-Box.svg" />

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


<img class="big-icon" alt="banner" src="img/features/API-Integration.svg" />

OAuh2 / OpenID compatible
-------------------------

Passwordless.ID is compatible with both *OAuth2* and *OpenID* protocols. That way, you can use it as a generic OpenID provider for a "Sign in with..." button.

If you are familiar with OAuth, you probably know that it is an "authorization" protocol. Usually, the API also offer a set of operations to grant permission to. In the case of Passwordless.ID, the only operation is accessing (part of) the user profile.

If you want to add Passwordless.ID as an additional social login provider using some predefined library, check out our [OAuth2/OpenID guide](/usage/openid)! 


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


<img class="big-icon" src="img/features/customer-experience.svg" />

If you like it, share it!
-------------------------

This was made with love, sweat and considerate thoughts. We strive to make the best possible authentication experience and are glad to hear any feedback.

If you like it too, talk about it to others! Share it with someone! Every little act is of great help to make it succeed. Thank you!

In the case you plan to write a blog article, a tutorial, some news or anything alike, we would be glad to hear from you. Perhaps we can feature it on our blog!


---


<img class="big-icon" src="img/features/icon-target.svg" />


The vision
----------

"Passwordless.ID" is meant to be a "free public identity provider" with the following philosophy.

- Make the web a safer place
- Make it easier for developers
- More comfort and control for users

This is achieved by providing tools and services to delegate the authentication to the Passwordless.ID API.

