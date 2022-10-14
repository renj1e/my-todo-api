express = require('express'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs'),
router = express.Router();

// DB Tables
const users = 'users';

// LOGIN
router.route('/login').post((req, res, next) => {
	const { body, params } = req;
	const { email } = body;
	req.con.query(`SELECT * FROM ${users} WHERE email = ?`, [email], (error, result) => {
		if (error) res.json({status: 'error', message: error, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		console.log(result)
		if(result.length > 0){
			// Create token
			const token = jwt.sign(
				{ user: email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "24h",
				}
			);
			console.log(token )
			res.json({status: 'success', result: { token: token, email: email }, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
	
		} else {
			res.json({status: 'warning', message: 'Opps! Email does not exist!', timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		}
	});
});

// REGISTER
router.route('/register').post((req, res, next) => {
	const { body, params } = req;
	const { email } = body;
	req.con.query(`INSERT INTO ${users} (email) VALUES (?)`, [email], (error, result) => {
		if (error) res.json({status: 'error', message: error, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		if(result){
			res.json({status: 'success', message: 'Email has been added.', timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		}
	});
});

module.exports = router;