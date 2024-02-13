# AuthApp

application to connect with your google account

## Env
```bash
"""""
.env
"""""
API_PORT= #8080
CLIENT_PORT= #3000
GOOGLE_CLIENT_ID=
```
## Google Client Id

[Doc developers](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid?hl=fr)


## Api

### Routes
```
POST {api_url}/google -> retrieve user informations (picture, email, given_name, family_name) from it google access token

body: {
    "google_id": string
}
```
