OAuth 2.0
---------

Although it is often used for a "Sign in with ..." authentication flow, the OAuth protocol actually stands for "Open Authorization".

It is originally made to authorize access to an API, and has been later "abused" to perform authentication thanks to the OpenID protocol built on top.

In its core, the OAuth protocol works as follow:

1. some app or website requests permission to use some parts of the API (the `scope`) on behalf of the user.
2. once the access `token` is obtained, it can be used as authorization to access the granted parts of the API.

For example, the scope might be `files calendar mails` to grant access to endpoints of the API related to these three scopes.

Now, how exactly you obtain this "access" `token` depends on the "flow" you choose. You can request it directly in the browser, which is called "implicit flow". This is typically used by pure front-end apps without server-side part. Alternatively, you may choose the "authorization code flow". This basically sends a `code` (for the back-end) that can be used only once to obtain the access `token`. This is often preferred because it never exposes the access `token` to the browser, therefore better from a security perspective.

Regarding the `token`, there are no rules regarding its structure. It might be a random ID, also called opaque token, or it might be a Json Web Token (JWT).


OpenID Connect
--------------

OpenID Connect is yet another protocol. It builds upon OAuth 2 in order to provided standardized scopes, API endpoints and content regarding user information.

So basically, a OAuth2/OpenID login works as follow:

1. I want to sign in
2. Redirect to `https://<id-provider>/authorization?...&scope=openid%20email` to request the authorization for my app to call the API
3. At some point you get called back `https://<my-fancy-app>/callback?code=abcd...` with the "code"
4. Server-side, fetch the access `token` thanks to the code by calling `https://<id-provider>/token?code=abcd...`
5. You know have the access `token` to call the `<id-provider>`'s API
6. Fetch `/userinfo` with `Authorization: Bearer <my-access-token` and you will lastly obtain the user information, containing the `email` among others
7. Show some welcome message and you are done

The OpenID protocol defines among others:

- default scopes (`openid`,`profile`,`email`,`phone`,`address`)
- default `userinfo` content
- a way to discover `/authorization`, `/token`, `/userinfo` endpoints
- TODO...


Passwordless.ID
---------------

When you think about it, using an "authorization" protocol to fetch a code to fetch a token to fetch a userinfo endpoint is kind of overkill.
That is why Passwordless.ID takes some shortcuts to be much simpler and yet stay compatible with OAuth2 / OpenID.

Some simplifications can be made because internet standards evolved since the inception of OAuth2, that it is a public API and that the sole purpose of the API is to deliver OpenID related information.

This leads to the following simple usage:

- calling `/openid/authorization` can be done by anyone by simply using the "origin" as `client_id`
- calling `/openid/userinfo` in the browser works out of the box, an access token is already present in a cookie
- calling `/openid/token` in the browser works out of the box, an access token is already present in a cookie
- using the "authorization code" flow where the server receives a code and fetches an access token is still possible too

Obtaining an identity token is therefore trivial, either from the browser using a direct call or from a server by reusing generic OAuth2 / OpenID libraries.

The "access" token itself has no real use regarding Passwordless.ID, since after all the single and only usage of the API is to retrieve the ID token. Nevertheless, it is still possible to retrieve for compatibility purposes with the OAuth2 / OpenID protocol.


Opening up a world of possibilities
-----------------------------------
 
The ID token identifies the user. It has two important components:

"sub": "..." // The user's ID
"aud": "..." // For which app/website the token was issued for