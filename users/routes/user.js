express = require('express'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs'),
url = require('url'),
store = require('store'),
router = express.Router();

// DB Tables
const users = 'users';

// LOGIN
router.route('/login').post((req, res, next) => {
	const { body, params } = req;
	const { email } = body;
		console.log(body)
	req.con.query(`SELECT * FROM ${users} WHERE email = ?`, [email], (error, result) => {
		if (error) res.redirect(
	    	url.format({
				pathname:`/`,
		    })
		);
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
			store.set('email', email)
			store.set('id', result[0]._id)
			store.set('token', token)

			// res.json({status: 'success', result: { token: token, id: result[0]._id }, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		    res.redirect(
		    	url.format({
					pathname:`/lists/${result[0]._id}`,
			    })
			);
		} else {
			// res.json({status: 'warning', message: 'Opps! Email does not exist!', timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
			res.redirect(
		    	url.format({
					pathname:`/`,
			    })
			);
		}
	});
});

// REGISTER
router.route('/register').post((req, res, next) => {
	const { body, params } = req;
	const { email } = body;
	req.con.query(`INSERT INTO ${users} (email) VALUES (?)`, [email], (error, result) => {
		if (error) res.redirect(
	    	url.format({
				pathname:`/`,
		    })
		);
		if(result){
			res.redirect(
		    	url.format({
					pathname:`/`,
					query: {
						message: 'Successfully added.'
					}
			    })
			);
		}
	});
});

module.exports = router;