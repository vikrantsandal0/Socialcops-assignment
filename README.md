# Socialcops-assignment
Back-end assignment

This assignment contains 4 APIs  , applying a json-patch, creating thumbnail, user login, and one for user signup also.

### Prerequisites
  You need to have nvm(node version manager) and xampp installed. This project uses node version 8.11.1 and in case of any issues popping try "nvm install 8.11.1"
and "nvm use 8.11.1" . Folder contains a final3.sql file which you can import to have login and signup functionality working for you.
  
### Major libraries/frameworks used
* Node.js
* Hapi.js
* hapi-swagger.js
* boom.js
* chai.js
* jsonwebtoken
* async-mysql
* bcrypt.js

  
  
  
  
  
  
### how to start 

```
1- import final3.sql in database,
2- start xampp : sudo -i,  cd/opt/lampp, sudo ./manager-linux-x64.run 
3- start server: node server.js
4- to run chai tests: npm test
5- check  swagger documentation: http://localhost:9000/documentation

```

### Installing
The project already contains all node modules still if any 
module is missing run - npm install


some examples of data you will find when run:


#### signup

use +91 as country code just for convenience,
password must be atleast 5 letters long

```
{
  "status": 200,
  "message": "success",
  "data": {
    "id": 16,
    "email": "socialcops@gmail.com",
    "contact": "+917070707070"
  }
}

```


#### login
```
{
  "Status": 200,
  "message": "success",
  "data": {
    "id": 11,
    "email": "vikrantsandal0@gmail.com",
    "name": "vikrant"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoidmlrcmFudCIsImlhdCI6MTUyNDU1MDg0N30.JJNDdmZUoYSSOyFsUagvgIcrGJd_UxiyxjaXeK8P3ns"
}
```

Use this token generated everytime when you login in authorization header during  thumbnail generation and applying patch .

#### jsonpatch

after adding the token . Write the json patch ,which basically is an object of one object and one array of objects(also displayed
on swagger).
patch1: the object on which patch will be applied
patch 2: the array of operations which will be applied

```
{
  "patch1": {
  "baz": "qux",
  "foo": "bar"
},
  "patch2": [
  { "op": "replace", "path": "/baz", "value": "boo" }
]
}

```
#### thumbnail generation

after adding the token , add the url of the image which will be downloaded and resized .you will get a link of the api where you can
actually see thumbnail plus it will be uploaded to your local assignment folder.
```
{
  "Status": 200,
  "message": "success",
  "data": {
    "link": "http://localhost:9000/user/v1/resizedImage"
  }
}


```
## Authors

* **Vikrant Sandal** 
