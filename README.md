# my-todo-api
TO-DO API using NodeJS, MySql

# Dump .sql file
	- data/data.sql

# .ENV
	- .dev.env -> .env

# Run User API
	- cd my-todo-app\users
	- npm i && npm start

# Run To-dos API
	- cd my-todo-app\todo_lists
	- npm i && npm start

# Register
POST: http://localhost:3001/api/user/register
BODY: {"email":"myemail@gmail.com"}
RETURN: {
    "status": "success",
    "result": {
        "token": "...",
        "email": "myemail@gmail.com"
    },
    "timestamp": "10/14/2022, 7:28:39 PM"
}

# Login
POST: http://localhost:3001/api/user/login
BODY: {"email":"myemail@gmail.com"}
RETURN: {
    "status": "success",
    "result": {
        "token": "...",
        "email": "myemail@gmail.com"
    },
    "timestamp": "10/14/2022, 7:28:39 PM"
}

# Get All to-dos
GET: http://localhost:3002/api/todo/[email] (ex. myemail@gmail.com)
RETURN: {
    "status": "success",
    "result": [
        {
            "email": "myemail@gmail.com",
            "id": 1,
            "title": "Code this1",
            "status": 1
        },
        {
            "email": "myemail@gmail.com",
            "id": 2,
            "title": "Code this2",
            "status": 1
        }
    ],
    "timestamp": "10/14/2022, 7:23:12 PM"
}

# Insert
PUT: http://localhost:3002/api/todo/[user_id] (ex. 1,2,3)
BODY: {"title":"task 3"}
RETURN: {
    "status": "success",
    "message": "TODO has been added.",
    "timestamp": "10/14/2022, 7:33:01 PM"
}

# Update
PATCH: http://localhost:3002/api/todo/[todo_id] (ex. 1,2,3)
BODY: {"title":"task 3","status":0}
RETURN: {
    "status": "success",
    "message": "TODO has been added.",
    "timestamp": "10/14/2022, 7:33:01 PM"
}

# Delete
DELETE: http://localhost:3002/api/todo/[todo_id] (ex. 1,2,3)
RETURN: {
    "status": "success",
    "message": "TODO has been deleted.",
    "timestamp": "10/14/2022, 7:34:54 PM"
}