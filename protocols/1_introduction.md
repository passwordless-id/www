OAuth2, OpenID, and WebAuthn are three important technologies used in modern web authentication and authorization processes.
They are very different by nature and complementary. Here is a brief overview of each technology.

The protocols
-------------

### OAuth2

OAuth2 is an open standard for **authorization**. It enables secure authorization between web applications, APIs, and services without sharing user credentials. It typically involves asking the user some permissions (to access user data or use some APIs) for granting access to third-party applications "on behalf" of the user. It allows users to grant limited access to their resources on one site to another site without revealing their username and password. OAuth2 It provides a standardized way to obtain access tokens that can be used for subsequent API requests.

### OpenID

This protocol is used for user **authentication**. It allows users to authenticate themselves on multiple websites using a single set of credentials. OpenID provides a way for a relying party (e.g., a website or application) to verify the user's identity with an OpenID provider (e.g., Google or Microsoft). It eliminates the need for multiple usernames and passwords, making it more convenient for users. OpenID is often used alongside OAuth2 for identity verification and authentication.

### WebAuthn

WebAuthn is a recent web standard for secure and passwordless **authentication**. It aims to provide stronger authentication capabilities and reduce the reliance on passwords. WebAuthn allows users to authenticate using biometrics (such as fingerprints or face recognition) or external authenticators (like security keys or mobile devices). It leverages public-key cryptography to enable strong authentication without the need for transmitting passwords. WebAuthn is designed to be compatible with a wide range of devices and platforms, making it more secure and convenient for users.

Summary
-------

In summary, OAuth2, OpenID, and WebAuthn are three crucial technologies that facilitate secure and convenient authentication and authorization processes on the web. OAuth2 focuses on authorization and delegated access to user resources, OpenID enables authentication using an identity provider and single sign-on capabilities, while WebAuthn provides advanced passwordless authentication options using biometrics and security keys.

