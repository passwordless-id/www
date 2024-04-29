RFC: https://datatracker.ietf.org/doc/html/rfc6749

**Authorization code**

| Parameter     | Description                                          |
| ------------- | ---------------------------------------------------- |
| `grant_type`  | The type of grant requested (e.g., "authorization_code", "password", "client_credentials"). |
| `redirect_uri` | The redirection URI to which the authorization server will send the user-agent after the user grants/denies consent. |
| `code`        | The authorization code received from the authorization server (for the "authorization_code" grant type). |

**Refresh token**

| Parameter     | Description                                          |
| ------------- | ---------------------------------------------------- |
| `client_id`   | The unique identifier of the client making the request. |
| `client_secret` | The secret key or password associated with the client, used for client authentication. |
| `username`    | The resource owner's username (for the "password" grant type). |
| `password`    | The resource owner's password (for the "password" grant type). |
| `scope`       | The scope of access requested by the client. Specifies what resources the client intends to access. |
| `refresh_token` | A refresh token used to obtain a new access token when the original access token expires (for grant types that support refresh tokens). |

**Other grants**
