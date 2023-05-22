Sign in with...
===============

You can use the "Sign in" button on your own website directly. No account required, not even an email. This is a "public" identity provider. Everyone can use it as much as they want.

Thanks to such a "Sign in" Button, you will obtain:

- the user profile (to display the avatar in the corner for example)
- an `id_token` which is a signed proof of the user's identity that you can send to your APIs and verify server-side

Demo
----

[https://passwordless-id.github.io/demo/](https://passwordless-id.github.io/demo/)

This demo has a single "Sign In" button. Upon click it fill trigger the authentication/authorization flow and once completed go back to the originating web page.

Then, the profile will be displayed, and an `id_token` be provided, that can be sent to your own APIs.

Code
----

The code of the demo is [here](https://github.com/passwordless-id/demo).

It uses a library called [@passwordless-id/connect](https://github.com/passwordless-id/connect). This library makes it possible to trigger the authentication/authorization using a single call.

```js
// Makes a redirect to let the user authenticate and authorize your app to read the scope
const user = await connect.auth({scope: 'openid avatar email'})
```

And can be used to fetch the user profile and `id_token` afterwards.

```js
// Fetch user profile and `id_token`
const user = await connect.id({scope: 'openid avatar email'})
```


Under the hood
--------------

Accessing the profile is as simple as calling `GET /userinfo`. See for yourself: [https://api.passwordless.id/openid/userinfo](https://api.passwordless.id/openid/userinfo)

The response is something like this:

    {
      "sub": "some-anonymized-id",
      "nickname": "My Nickname",
      "picture": "https://ui.passwordless.id/avatars/andy.svg",
    }

Of course, this works only if:

- the user is signed in (Otherwise you receive `401 Unauthorized`)
- The user ganted access (Otherwise you receive `403 Forbidden`)

In order to let the user sign in or grant access, simply invoke `https://api.passwordless.id/authorize`.

You might also request access to a larger scope, like phone number, personal information, address...

You can also request a JWT using `GET /token` to obtain the same information as a signed token. This token is particularly useful for the server side, since the JWT signature proves the user information authenticity.

