Overview
========

The "simple" flow
-----------------

As the name implies, the "simple" flow is pretty straightforward.

1. Request an id_token from the browser side
   - if an `id_token` is returned, great
   - if not, redirect to the authentication/authorization page
2. Send this `id_token` to your server API
3. Server-side, validate the `id_token` to confirm the user

Using generic OAuth2/OpenID libs
--------------------------------

The PKCE flow
-------------

On the client side, use the https://github.com/passwordless-id/connect library to obtain the `profile` and `id_token` of the user.

This `id_token` can then be sent to the server as a proof of identity.