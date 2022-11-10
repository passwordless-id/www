---
title: Passwordless
subtitle: Authentication using TouchID or FaceID for everyone. Less passwords, more security!
---

Passwordless
============

> Less passwords, more security!

![Banner](img/banner-biometric-auth.svg)

<iframe src="form.html" style="width:100%;height:300px;border:none;"></iframe>



<section id="userinfo" class="hidden">
  <img />
  <h1>Hello ???!</h1>
  <pre></pre>
</section>

<section id="login" class="hidden">
  <p>Sign in with...</p>
  <a class="btn-passwordless-id" href="https://ui.passwordless.id">
    <img src="http://passwordless.id/logo/logo-500x125.svg" />
  </a>
</section>

<link rel="stylesheet" type="text/css" href="css/sign-in-with.css">
<script src="js/sign-in-with.js"></script>




<img src="img/icon-target.svg" style="height:2em; vertical-align:middle" /> The vision
---------------------------

Currently, this is just a demo, a few guides, tips and resources about the recent [webauthn](webauthn/1_introduction.md) protocol.

In the future, "Passwordless" is planned to become a "free public identity provider".

An authentication platform with multiple goals:

- Make the web a safer place
- Make it easier for developers
- More comfort and control for users

Basically, a free public webservice to let:

- Any user register/authenticate
- Any app/service know who the user is (provided the user allows it)



<img src="img/icon-faq.svg" style="height:2em; vertical-align:middle" /> F.A.Q. 
-------------------------------

### Is my fingerprint/face sent to the server? 

**No.** Your fingerprint, face or other biometrics never leaves your device.
The biometric verification is a security constraint that occurs locally on your device
to create and access security keys (similar to large random passwords).

### How does it work exactly? 

It relies on [asymetric cryptography](https://en.m.wikipedia.org/wiki/Public-key_cryptography). 
Upon registration, a cryptographic key pair is generated.
The private key kept on the device, protected by biometrics,
while the public key is sent to the server.
In combination, they can be used to encrypt and decrypt messages respectively.
For more technical details about the protocol, check the webauthn guide.

### Is it more secure than passwords? 

**Yes.** It is basically a two-factor authentication in a single step. 

- The first factor is something you have. 
The authentication only works on registered devices. 
- The second factor is something you are, or something you know. 
A biometric verification, or the device PIN code, is required.

Moreover:

- It protects against phishing (article coming soon)
- The cryptographic keys are never exposed (article coming soon)

### What if my device is lost or stolen? 

Unlike traditional authentication systems with a single password,
you register multiple access keys, one per device.

If you lose your device, your lose your access key.
Therefore, it is important to either have another registered device or an appropriate recovery mechanisms.

Likewise, if your device is stolen and the thief can unlock it (for example if the pattern is trivial),
then the thief has full control over your phone and could possibly also impersonate you.
In this case, it is important to remove that device from the list of authorized devices.


