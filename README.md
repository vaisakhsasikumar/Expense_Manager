# Expense_Manager

1) POST http://localhost:3000/register/
{
  "username": "nadish",
  "password": "P@ssw0rd",
  "email": "nadish@gmail.com",
  "photolink": "",
  "phoneNumber": "9400000464"
}
returns
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTg2Njk4NTA0LCJleHAiOjE1ODY3ODQ5MDR9.nwMX3GjS37N38VT830dgbkUVH82rY9ZygTmPcnq4tZE",
    "data": {
        "_id": 4,
        "username": "nadish",
        "password": "$2a$08$VU8q1fpjB47Rf2FM2RnhY.Ff9WKe/RdVKqVwCg40LDI3nHSrv9zQS",
        "email": "nadish@gmail.com",
        "photolink": "defalt photo link",
        "phoneNumber": "9400000464",
        "totalSpendAmount": 0,
        "totalPaidAmount": 0,
        "finalStatus": 0,
        "updatedAt": "2020-04-12T13:35:04.040Z",
        "createdAt": "2020-04-12T13:35:04.040Z"
    }
}
2) POST http://localhost:3000/login/
{
  "password": "P@ssw0rd",
  "email": "vaisakh@gmail.com" 
}
return
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODY2OTc2ODMsImV4cCI6MTU4Njc4NDA4M30.pZIuEALSpJ1IRjqWO7kKG5XvG-v_8V8i-iHZJv_kiWw"
}


For all subsequent Requests we have to send token also with header x-access-token

3) GET http://localhost:3000/users/vaisakh
Send the token (x-access-token) in header. Only works if there is a token. Any User cannot see the information of other Users.

[
    {
        "_id": 2,
        "username": "vaisakh",
        "password": "$2a$08$pASnxLXvyfFeAw46adUJ6.UVDYeFL4.pjZwKl1GzRDgSFf/TnxgdK",
        "email": "vaisakh@gmail.com",
        "required": null,
        "phoneNumber": "9400000464",
        "photolink": "defalt photo link",
        "totalSpendAmount": 0,
        "totalPaidAmount": 0,
        "finalStatus": 0,
        "createdAt": "2020-04-12T13:20:56.000Z",
        "updatedAt": "2020-04-12T13:20:56.000Z"
    }
]
4) UPDATE and DELETE operations are also supported for Users.