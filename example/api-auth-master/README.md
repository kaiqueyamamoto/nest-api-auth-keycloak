<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description
Service responsible for account authentication and validation

### URLS:
LOCAL: http://127.0.0.1:5000 <br/>
DEV:   https://dev.wivo.io/api/v1/auth/ <br/>
PROD:  https://app.wivo.io/api/v1/auth/ <br/>
INTERNO: <br/>

#### Description Services
* DB: Postgres SQL
* API: Data mock api like TokenJWT - UUID - Faker


### Route Google:
Request:
```http request
POST https://dev.wivo.io/api/v1/auth/google
Content-Type: application/json

{
 uuid: "e7fd8564-c37a-424a-b69f-7afe75031f00"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRcU1qT1J5ckdhdHRYYWlFdDBrQUJvNDdwSVpmMTAzYWRoWHN4ZXpmd25vIn0.eyJleHAiOjE2MzE5MzMyNDksImlhdCI6MTYzMTg5ODE2NSwiYXV0aF90aW1lIjoxNjMxODk3MjQ5LCJqdGkiOiI1YTQ5ZWVjZS1mYWE5LTRlZmEtYmFkYS04NTU3Y2NlNWM5NTYiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLWRldi53aXZvLmlvL2F1dGgvcmVhbG1zL3dpdm9fYXBwIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRkYWY2NzBmLWIzNGQtNDIwYy04ODBlLWVhZjY0YzU5MDNiZCIsInR5cCI6IkJlYXJlciIsImF6cCI6Indpdm9fZGV2Iiwic2Vzc2lvbl9zdGF0ZSI6IjMwYjU1YTk5LTU5YmQtNGM2Ni05ZTY0LTJhZTM5MzViZmJmNCIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy13aXZvIGFwcCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIzMGI1NWE5OS01OWJkLTRjNjYtOWU2NC0yYWUzOTM1YmZiZjQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJLYWlxdWUgTWl0c3VvIFNpbHZhIFlhbWFtb3RvIiwicHJlZmVycmVkX3VzZXJuYW1lIjoia2FpcXVlQHJlZGJsb2NrLmNvbS5iciIsImdpdmVuX25hbWUiOiJLYWlxdWUiLCJmYW1pbHlfbmFtZSI6Ik1pdHN1byBTaWx2YSBZYW1hbW90byIsImVtYWlsIjoia2FpcXVlQHJlZGJsb2NrLmNvbS5iciJ9.WpPo8iy-IAjrmDlbi8gZlJTaFUta6M1d2kXwH2tKE1q7YDAdgX2SpyspVmvu73_sneBndNOhX45IltFyttRgMBwfeQ7UCYordyWrHRHa3Lq1M5sqEiNaENdPXIVwI72W0G_nHH_3j8AaJoqIRtEgMAwwZlQ6aPfUOOpjk0C4h2nldFvYTsC0QmjCdR6jnLBLDEJeXcFVwMHCOwylxVvO_VH8YgVRaed7VlPeGbPDz-9g_aqBrOT8ZzUnd7HjnWITr1yJZD2RQzPV4hfxzvErgLwxtQR2r11FOcQEbfQ41DQleqjZz-HJnZq7KmVflafddJfA7qEblYQ1KA5I9YHy4A",
  "data": {
    "sub": "ddaf670f-b34d-420c-880e-eaf64c5903bd",
    "email_verified": false,
    "name": "Kaique Mitsuo Silva Yamamoto",
    "preferred_username": "kaique@redblock.com.br",
    "given_name": "Kaique",
    "family_name": "Mitsuo Silva Yamamoto",
    "email": "kaique@redblock.com.br"
  },
  "auth": {
    "provider": "google",
    "uuid_anonymous": "0df017e8-8c75-4ebb-8087-756e748d2857"
  }
}
```

### Route Linkedin:
Request:
```http request
GET https://dev.wivo.io/api/v1/auth/lindkedin
Content-Type: application/json

{
 uuid: "e7fd8564-c37a-424a-b69f-7afe75031f00"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRcU1qT1J5ckdhdHRYYWlFdDBrQUJvNDdwSVpmMTAzYWRoWHN4ZXpmd25vIn0.eyJleHAiOjE2MzE5MzMyNDksImlhdCI6MTYzMTg5ODE2NSwiYXV0aF90aW1lIjoxNjMxODk3MjQ5LCJqdGkiOiI1YTQ5ZWVjZS1mYWE5LTRlZmEtYmFkYS04NTU3Y2NlNWM5NTYiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLWRldi53aXZvLmlvL2F1dGgvcmVhbG1zL3dpdm9fYXBwIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImRkYWY2NzBmLWIzNGQtNDIwYy04ODBlLWVhZjY0YzU5MDNiZCIsInR5cCI6IkJlYXJlciIsImF6cCI6Indpdm9fZGV2Iiwic2Vzc2lvbl9zdGF0ZSI6IjMwYjU1YTk5LTU5YmQtNGM2Ni05ZTY0LTJhZTM5MzViZmJmNCIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy13aXZvIGFwcCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIzMGI1NWE5OS01OWJkLTRjNjYtOWU2NC0yYWUzOTM1YmZiZjQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJLYWlxdWUgTWl0c3VvIFNpbHZhIFlhbWFtb3RvIiwicHJlZmVycmVkX3VzZXJuYW1lIjoia2FpcXVlQHJlZGJsb2NrLmNvbS5iciIsImdpdmVuX25hbWUiOiJLYWlxdWUiLCJmYW1pbHlfbmFtZSI6Ik1pdHN1byBTaWx2YSBZYW1hbW90byIsImVtYWlsIjoia2FpcXVlQHJlZGJsb2NrLmNvbS5iciJ9.WpPo8iy-IAjrmDlbi8gZlJTaFUta6M1d2kXwH2tKE1q7YDAdgX2SpyspVmvu73_sneBndNOhX45IltFyttRgMBwfeQ7UCYordyWrHRHa3Lq1M5sqEiNaENdPXIVwI72W0G_nHH_3j8AaJoqIRtEgMAwwZlQ6aPfUOOpjk0C4h2nldFvYTsC0QmjCdR6jnLBLDEJeXcFVwMHCOwylxVvO_VH8YgVRaed7VlPeGbPDz-9g_aqBrOT8ZzUnd7HjnWITr1yJZD2RQzPV4hfxzvErgLwxtQR2r11FOcQEbfQ41DQleqjZz-HJnZq7KmVflafddJfA7qEblYQ1KA5I9YHy4A",
  "data": {
    "sub": "ddaf670f-b34d-420c-880e-eaf64c5903bd",
    "email_verified": false,
    "name": "Kaique Mitsuo Silva Yamamoto",
    "preferred_username": "kaique@redblock.com.br",
    "given_name": "Kaique",
    "family_name": "Mitsuo Silva Yamamoto",
    "email": "kaique@redblock.com.br"
  },
  "auth": {
    "provider": "linkedin",
    "uuid_anonymous": "0df017e8-8c75-4ebb-8087-756e748d2857"
  }
}
```

### Route Anonymous
Request:
```http request
GET https://dev.wivo.io/api/v1/auth/anonymous
```
Response:
```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRcU1qT1J5ckdhdHRYYWlFdDBrQUJvNDdwSVpmMTAzYWRoWHN4ZXpmd25vIn0.eyJleHAiOjE2MzE5MzE2MDIsImlhdCI6MTYzMTg5NTYwMiwianRpIjoiMTlhOGM4ODMtMTNiZC00MjFiLWI3NzQtMjU3NGJhZTczZmY4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay1kZXYud2l2by5pby9hdXRoL3JlYWxtcy93aXZvX2FwcCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhZDlmNmQxZS1lZDJhLTQ3YjYtOTFjNC1kZTk1YTM5NGMxNzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3aXZvIiwic2Vzc2lvbl9zdGF0ZSI6IjIzOWVlOTRlLWExOTMtNDZjZC1hM2JlLWJhN2Y4NGFjYjQzYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9kZXYud2l2by5pbyJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtd2l2byBhcHAiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIyMzllZTk0ZS1hMTkzLTQ2Y2QtYTNiZS1iYTdmODRhY2I0M2IiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6ImQ0OTFiYmRjLTgzNDMtNDc1Mi1iZDg1LWQ5YzFiMzYyYWRiYiIsInByZWZlcnJlZF91c2VybmFtZSI6ImQ0OTFiYmRjLTgzNDMtNDc1Mi1iZDg1LWQ5YzFiMzYyYWRiYiIsImZhbWlseV9uYW1lIjoiZDQ5MWJiZGMtODM0My00NzUyLWJkODUtZDljMWIzNjJhZGJiIiwiZW1haWwiOiJkNDkxYmJkYy04MzQzLTQ3NTItYmQ4NS1kOWMxYjM2MmFkYmIifQ.KexEtVbFJFlHZHNX9av2p6jBvX4GDH8G9za9psR7qWNWxRghOlbY7v6tzHVT0F-jzZCKtcA_fGvNAUQxNF_hzXZg1-8G-NGf4bczfe3-uVbVc2LucJBuz_2Bvb_CcfSjtcp63ApPipRWG3WQVVXpU4u_AP9UuV3JN7IRNLOXhyVlhSzj1Vejy2e0W_nbETC9wqg30usm52h59mXg7gCm78MY_fhnAW2kmxHrCDUQhgEeZDcrlYuo-Gc3xMa7JKYr0lBgXvW9qcWn9uVDDnviiPwzqRQeMIPJPmQXOwcdc1nUBUHpeTxtnioMvTdWeVMqivRgid2Ej-_2mB06L4SDFA",
  "uuid": "d491bbdc-8343-4752-bd85-d9c1b362adbb"
}
```

### Route activation/sms
Request:
```http request
POST https://dev.wivo.io/api/v1/auth/activation/sms
Content-Type: application/json

{
   “phone”:”5511941411042”
}
```
Response:
```json
{
  "sucess":"Seu codigo de verificaçao de celular chegara em alguns segundos, verifique seu celular",
}
```

### Route activation/email
Request:
```http request
POST https://dev.wivo.io/api/v1/auth/activation/email
Content-Type: application/json

{
   “email”:”kaique@wivo.io”
}
```

Response:
```json
{
  "sucess":"Seu codigo de verificaçao de email chegara em alguns segundos, verifique seu email",
}
```

### Route activation/resend/sms
Request:
```http request
POST https://dev.wivo.io/api/v1/auth/activation/resend/sms
Content-Type: application/json

{
  “phone”:”5511941411042”
}
```

Response
````json
{
  "status": true
}
````

### Route activation/resend/email
Request:
```http request
POST https://dev.wivo.io/api/v1/auth/activation/resend/sms
Content-Type: application/json

{
   “email”:”kaique@wivo.io”
}
```

Response
````json
{
  "status": true
}
````

### Route Password recovery 
Request:
```http request
POST https://dev.wivo.io/api/v1/auth/recovery-password
Content-Type: application/json

{
   “email”:”kaique@wivo.io”
}
```

Response
````json
{
  "status": true
}
````
