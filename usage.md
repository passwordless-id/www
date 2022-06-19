```
title Passwordless

example.com->passwordless.angelside.dev: Redirects
passwordless.angelside.dev->passwordless.angelside.dev: Register / Sign in passwordless
example.com<-passwordless.angelside.dev: Redirects
example.com->passwordless.angelside.dev: GET /user
example.com<--passwordless.angelside.dev: {"email":"...", "jwt": "..."}

example.com->API: Authorization JWT
API->API: Validate JWT
API->passwordless.angelside.dev: or use POST /validate
API<--passwordless.angelside.dev:
```
