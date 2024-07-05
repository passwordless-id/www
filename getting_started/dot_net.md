Getting started with .Net
=========================

> Contributed by @moberauer, source: https://github.com/moberauer/passwordless.id-ASP.NET-Core-Demo

# Passwordless.ID - ASP.NET Core Demo

> This [example repository](https://github.com/moberauer/passwordless.id-ASP.NET-Core-Demo) shows an integration between [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet) and [Passwordless.ID](https://passwordless.id).
>
> The project uses the .NET web sdk and just one NuGet package needs to be installed: `Microsoft.AspNetCore.Authentication.OpenIdConnect`

Using the OpenIdConnect SDK, set the default authentication scheme to OpenId, configure it to use the authoriozation code flow, the clientId and the metadata address provided by [Passwordless.ID](https://passwordless.id). Then we also add an external cookie scheme to store the user information once sign in via [Passwordless.ID](https://passwordless.id) was successful.


```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddAuthentication(defaultScheme: OpenIdConnectDefaults.AuthenticationScheme)
    .AddOpenIdConnect(openIdConnectOptions => 
    {
        openIdConnectOptions.SignInScheme = IdentityConstants.ExternalScheme;
        openIdConnectOptions.ResponseType = OpenIdConnectResponseType.Code;
        openIdConnectOptions.ClientId = "https://localhost";
        openIdConnectOptions.MetadataAddress = "https://api.passwordless.id/.well-known/openid-configuration";
    })
    .AddExternalCookie();
builder.Services.AddAuthorization();
var app = builder.Build();
```
Now we configure the request pipeline to use the authentication and authorization middleware provided by ASP.NET Core and we map two endpoints: one which does not require authentication and one which does.

```csharp
var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.MapGet("/", () => "Go to /private to authenticate");
app.MapGet("/private", context => {
    string username = context.User.FindFirst("preferred_username")?.Value ?? string.Empty;
    return context.Response.WriteAsync($"Hello, {username}!");
}).RequireAuthorization();

app.Run();
```

When we hit the authorized endpoint the authentication and authorization middleware take care of the redirects and callbacks to [Passwordless.ID](https://passwordless.id), code retrieval, id_token retrieval and storing the userinfo in the external cookie scheme cookie named *Identity.External*. The user information including all the claims provided by [Passwordless.ID](https://passwordless.id) is then available to our endpoint code via *context.User*.