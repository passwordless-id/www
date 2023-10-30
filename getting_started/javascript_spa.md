Getting Started - Javascript
============================

> In this tutorial, we will create a simple page with a "Sign in" button.
> Once clicked, the user will be redirected to passwordless.ID to authenticate and return back to this page and show the user profile.

- The demo can be seen here: https://passwordless-id.github.io/demo/
- The full source code is available here: https://github.com/passwordless-id/demo

Create an HTML page
-------------------

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign in with Passwordless.ID demo</title>
    <script type="module" src="sign-in-with.js" defer></script>
</head>
<body>
    
    <button id="sign-in" class="btn btn-light" onclick="app.signIn()">Sign In</button>

    <section id="profile" class="card shadow" hidden>
        <div class="card-body">
            <img id="picture" style="height:100px" />
            <h3 id="nickname">Nickname</h3>
        </div>
    </section>

    <button id="sign-out" class="btn btn-light" onclick="app.signOut()" hidden>Sign Out</button>

    <footer>
        <a href="https://github.com/passwordless-id/demo">See the code on GitHub</a>
    </footer>
</body>
</html>
```


Trigger the sign-in
--------------------

It uses the OAuth2 / OpenID flow using the [@passwordless-id/connect](https://github.com/passwordless-id/connect) library.


The code for that looks as follows.

```js
import passwordless from 'https://unpkg.com/@passwordless-id/connect@1.2.0/dist/connect.min.js'

// the information requested from the profile
const scope = 'openid avatar email'

function onClickSignIn() => {
  // performs a redirect to let the user authenticate and/or authorize this app
  passwordless.auth({ scope })
}

function onClickSignOut = async () => {
  // performs a redirect to let the user sign out
  passwordless.logout()
}

async function init() {
  // retrieves the user profile and `id_token` if available
  const user = await passwordless.id({ scope })
  if (user.signedIn && user.scopeGranted)
    showUser(user)
  else
    showSignIn()
}
init()
```

Show the profile
----------------

The retrieved `user` has the following structure.

```json
{
 "signedIn": true,
 "scopeGranted": true,
 "id_token": "eyJ0eXAiOiJK...",
 "profile": {
  "nickname": "Johny",
  "picture": "https://ui.passwordless.id/avatars/sam.svg",
  "preferred_username": "johndoe",
  "...": "...more attributes depending on requested scope"
 }
}
```

Trigger the sign-out
--------------------

Using the token for API calls
-----------------------------

Once you obtain the user, you can also send the `token_id` to your server API as proof of the user's authenticity. This is a Json Web Token containing a signature that can be verified by common libraries.