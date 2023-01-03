OAuth2 / OpenID integration
===========================

Configuration
-------------

If you have to configure a OAuth2 client library manually, you will find the configuration at the following standardized URL.

    https://api.passwordless.id/.well-known/openid-configuration 

This configuration lists the endpoints and other information.

```json
{
    "issuer": "https://api.passwordless.id",
    "authorization_endpoint": "/openid/authorize",
    "token_endpoint": "/openid/token",
    "userinfo_endpoint": "/openid/userinfo",
    "jwks": "TODO"
}
```



Flows
-----

As per the OAuth2/OpenID protocol, there are three "things" you can obtain.

- A code (to be exchanged for an access token server side)
- An access token (to access `/openid/userinfo` endpoint)
- The ID token (the signed user profile part)

Usually, what you want is the ID token, the proof of the user's identity.

The access token in this case is of little use since the sole purpose of the API is to provide the ID. Nevertheless, you can request an access token if desired.

Lastly, the "authorization code" flow is pretty widespread too. In this flow, a "code" is obtained and exchanged server side for access and/or id tokens. This has the benefit of not exposing the tokens to the client side. It is a security measure to avoid the risk of having the token highjacked due to a frontend vulnerability.



Scopes
------

- openid:
  - sub: anonymized user ID
- avatar:
  - nickname
  - picture
- email
  - email
  - email_verified
- phone
  - phone_number
  - phone_number_verified
- profile
- address
  - ...


> Remark regarding the `sub` user ID.
> 
> According to the OpenID protocol, the `sub` value is the user identifier. We decided to deviate from the protocol and anonymize this ID for security and privacy reasons. The `sub` value will differ depending on the domain requesting the `id_token` or triggering the OAuth2 flow.
> 
> **If a domain `example.com` and and a domain `other.org` request an `id_token`, they will obtain two distinct `sub` IDs, even if it is the same user. This applies to subdomains too.**
> 
> This was decided to:
> 
> - avoid tracking users accross multiple domains
> - reduce the risk of using an `id_token` obtained from another website



Implicit flow
-------------

The implicit flow is the most straightforward one.

The browser simply invokes the authorization endpoint, and once the user is authenticated and has granted the scope, an `id_token` will be obained in the URL hash.

    https://api.passwordless.id/openid/authorize?response_type=id_token&scope=openid+avatar&redirect_uri=...

This will be a HTTP 302 which will perform a redirect. Once done, it will redirect back to the original website URL provided by `redirect_uri`.

    {{redirect_uri}}#id_token=...



Authorization code flow (PKCE)
------------------------------

*For testing purposes only.*

Currently, the authorization code flow lacks security hardening and is available for testing purposes only. The flow works according to specifications but ignores values of `client_id` and `client_secret`, so you could actually provide any placeholder values.

In order to get the increased security benefit from it, an account would be needed and a `client_secret` to exchange the code for the token. As it is now, anyone could exchange a token for a code and there is thus no advantage over the simpler implicit flow fetching the token directly. It would also requires disabling all other flows besides the auth code flow, which is currently not available either.

*The authorization flow can still be used for testing purposes with arbitrary values of `client_id`/`client_secret`. It does currently not offer enhanced security though.*



Security checklist
------------------

### Verify that the id_token algorithm is either `ES256` or `RS256`

This is a common attack where hackers tries to send tokens with a `none` algorithm, or use a symmetric algorithm using the public key as the private key, trying to confuse the JWT validation library.

### 4. Verify that the `aud` is your domain

If it is not, it is likely the case that an attacker sends you a token obtained from another website in order to impersonate that user on your service.


### 3. Verify that the `iss` value is `https://api.passwordless.id`

Otherwise, it's not a token coming from us.

### Validate the token

### 1. Use the `sub` value as user identifier

