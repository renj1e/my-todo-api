const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mw = require('./middleware/auth')
const cdb = require('./config/db');
require('dotenv').config();
// require('dotenv').config({path: __dirname + '/.env'});
const todo = require('./routes/todo')

const app = express();
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
app.use('/api/todo', mw, todo)

// Port
const port = process.env.PORT_TODO_API || 3002;
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