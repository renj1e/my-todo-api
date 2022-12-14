const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const mw = require('./middleware/auth')
const cdb = require('./config/db');
const request = require('request');
const store = require('store');
require('dotenv').config();
// require('dotenv').config({path: __dirname + '/.env'});

const user = require('./routes/user')

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

//Set Request Size Limit
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());

// DB connection init
const dbconn = (req, res, next) => {
  req.con = cdb;
  next()
}
app.use(dbconn)

// Routes
app.use('/api/user', user)

// Login Page
app.get('/', function(req, res) {
   const _id = store.get('id');
   const _email = store.get('email');
   res.render('pages/index', {
      id: _id,
      email: _email
   });
});

// Logout Page
app.get('/logout', function(req, res) {
   store.clearAll()
   res.render('pages/index', {
      id: 0
   });
});

// Lists Page
app.get('/lists/:id', function(req, res) {
   const { params } = req;
   const { id } = params;
   const _email = store.get('email');
   const _token = store.get('token');

   // console.log(_email, _id, _token)
   // Request URL
   var url = `http://localhost:3002/api/todo/${id}`;    
   request(url, {
        headers: {
         'Content-Type': 'application/json',
         'x-access-token': _token
        }
      }, (error, response, body)=>{

      // Printing the error if occurred
      if(error) console.log(error)

      var _list = [];
      // Printing status code
      if(response.statusCode === 200){
         _list = JSON.parse(body).result;
      }

      res.render('pages/lists', {
         id: id,
         email: _email,
         token: _token,
         lists: _list.length > 0? _list : []
      });
   });
});

// Add Page
app.get('/add/:id', function(req, res) {
   const { params } = req;
   const { id } = params;
   res.render('pages/add', {
      id: id
   });
});

// Add
app.post('/add/:id', function(req, res) {
   const _token = store.get('token');
   const { body, params } = req;
   const { title } = body;
   const { id } = params;

   // Request URL
   var url = `http://localhost:3002/api/todo/${id}`;
   request.put({url:url, 
     headers: {
      'Content-Type': 'application/json',
      'x-access-token': _token
     },
      form: {title:title}},
      function(error,response,body){
      // Printing the error if occurred
      if(error) console.log(error)

      var _list = [];
      // Printing status code
      if(response.statusCode === 200){
         _list = JSON.parse(body).result;
      }
      res.redirect(`/lists/${id}`);
   })
});

// Update Status
app.post('/update/:uid/:id/:status', function(req, res) {
   const _token = store.get('token');
   const { params, body } = req;
   const { uid, id, status } = params;
   const { title } = body;

   // Request URL
   var url = `http://localhost:3002/api/todo/${id}`;    
   request.patch({url:url, 
     headers: {
      'Content-Type': 'application/json',
      'x-access-token': _token
     },
      form: {title:title,status:status}},
      function(error,response,body){
      // Printing the error if occurred
      if(error) console.log(error)

      var _list = [];
      // Printing status code
      if(response.statusCode === 200){
         _list = JSON.parse(body).result;
      }
      res.redirect(`/lists/${uid}`);
   })
});

// Delete
app.post('/delete/:uid/:id', function(req, res) {
   const _token = store.get('token');
   const { params } = req;
   const { uid, id } = params;

   // Request URL
   var url = `http://localhost:3002/api/todo/${id}`;    
   request.delete(url, {
        headers: {
         'Content-Type': 'application/json',
         'x-access-token': _token
        }
      }, (error, response, body)=>{

      // Printing the error if occurred
      if(error) console.log(error)

      res.redirect(`/lists/${uid}`);
   });
});


// Port
const port = process.env.PORT_USER_API || 3001;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Errors
app.use((req, res, next) => {
  if (req.status === 404) {
      return res.status(400).send('404');
  }

  if (req.status === 500) {
      return res.status(500).send('500');
  }

 next();
});