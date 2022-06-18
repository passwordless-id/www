Traditional vs passwordless
---------------------------

The subject of these "thoughts" articles are often a bit vague yet fundamental. In order to easely follow the discussion, it is important to grasp the webauthn protocol's fundamentals. Since a picture is worth a thousand words:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1kfw9qhwz3vb0b1gimbu.png)

Basically, webauthn stores cryptographic secrets *on the device*, protected by biometric/PIN, that is later used for login. This is fundamentally different than how people traditionally register and login. Not only is it passwordless and more secure, it is also *device bound* since the secret keys are stored on the device and not accessible otherwise.

Because of that, webauthn-based authentication would require one more action compared to the traditional login/register actions, namely *add device*. You need to "add" your other devices to your account first, if you want to be able to login with them too. So even the login screen might end up different, for example like this:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/93tnf9pxeesjy7tjqcym.png)

This little tiny change has profound impact since:

- you need to manage multiple authorized devices per user
- you need a recovery plan in case the user looses its device


Email vs Username
-----------------

In most authentication systems, there is a basic choice regarding whether a username or an email should be used to identify a user.

There are several implication of either choice, especially in combination with the webauthn protocol.

### The benefits of usernames

Before going through the problems of picking usernames as the leading identifier, let us look at the benefits.

- it's anonymous. Some users might be inclined not to share their email for various reasons.
- users can be directly registered, with a single "touch", without  password nor confirmation email.
- there is no *need* for an email (unlike traditional systems with "forgot password")
- it's slightly shorter to type


### Uniqueness

When registering an email, it's yours, it's unique. With usernames, there is the risk of getting a message like "oh no, this username is already taken!".

This is totally harmless for traditional authentication. However, in case of webauthn, which is device bound, there is no way to distinguish between the following:

- a user accidentally picking an already taken username
- a user wanting to add a new device to its existing account

UX wise, it might be helpful to adjust the UI depending on whether the username has been taken or not.

- Username exists: Login / Add Device
- Username is new: Register

However, this would likely result in confused users. Especially so since "Add Device" is an unknown concept for them.


### Recovery

If you register with a username only, you have no "recovery option" set yet. A recovery plan is necessary if you loose your device. Remember, there are no passwords, only a secret stored on the device. In case you register with an e-mail, this e-mail could already implicitly be used to send add device / recovery links.

Otherwise, you would have to explicitly choose your recovery option, which might be safer in some way. For example:

- phone number
- security question/answer
- register another device right now
- print QR code
- none (danger: device loss == account loss)

... Or using an e-mail address, the most common way. ;)


Do we even need a username / email?
-----------------------------------

Boom. No. Actually we don't. What about registering without anything?! Yeah, that's right. This is possible since this whole protocol is basically device bound. Your account would not need a username/email, it would some unseen random identifier, linked to all your devices. How to link a device? Well, basically the same as recovery options: per QR code, SMS, temporary code to type, e-mail...

However, there is a drawback too: it sounds alien for users not to have an identifier. This should not be taken lightly. The second drawback is investigating support issues in case someone has an issue with its account. So we are back to square one. ;)


What about a single button "sign in"?
-------------------------------------

Basically, if the e-mail is the identifier, the login/registration/add-device scenarios are not that different.

Actually, a single "sign in / register" button might suffice.

If the account does not exist, an e-mail will be sent for registration.

If the device is unknown, an e-mail will be sent to add the device.

If the device is known, login proceeds.

Why were there separate buttons in the first place? Well, in traditional authentication systems, there are a variety of small reasons. Typing a super complex password correctly for example. However, in a passwordless protocol, both "interfaces" for login and registration can basically be reduced to the same: the email. In this context, a single button makes much more sense. 