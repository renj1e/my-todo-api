express = require('express'),
store = require('store'),
router = express.Router();

// Login Page
app.get('/', function(req, res) {
   const _id = store.get('id');
   const _email = store.get('email');
   res.render('pages/index', {
      id: _id,
      email: _email
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

   console.log( title)
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
      console.log(_list)
      res.redirect(`/lists/${id}`);
   })
});

// Update
app.post('/update/:todo_id/:status', function(req, res) {
   const _token = store.get('token');
   const { body, params } = req;
   const { title } = body;
   const { todo_id, status } = params;

   console.log( title)
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
      console.log(_list)
      res.redirect(`/lists/${id}`);
   })
});

module.exports = app;