# backend_server

POST MAN:

Use this format for team registration with team code

```json
{
  "teamCode": "TEAM379",
  "userData": {
    "name": "{{$randomFullName}}",
    "email": "{{$randomEmail}}",
    "phone_number": "{{$randomPhoneNumber}}",
    "institution": "Kathmandu University",
    "address": "{{$randomStreetAddress}}",
    "social_media": "@{{$randomUserName}}"
  }
}
```

Use this format for registration by team Creation

```json
{
  "teamName": "{{$randomAdjective}}",
  "userData": {
    "name": "{{$randomFullName}}",
    "email": "{{$randomEmail}}",
    "phone_number": "{{$randomPhoneNumber}}",
    "institution": "Kathmandu University",
    "address": "{{$randomStreetAddress}}",
    "social_media": "@{{$randomUserName}}"
  }
}
```
