mysql = require('mysql2');
// require('dotenv').config({path: __dirname + '/.env'});
require('dotenv').config();
// require('dotenv').config({path: __dirname + '/.env'});
// MYSQL CONN
module.exports = mysql.createPool({
	host : process.env.HOSTNAME,
	user : process.env.USER,
	password : process.env.PASSWORD,
	database : process.env.DB,
	connectionLimit: process.env.CONN_LIMIT,
});