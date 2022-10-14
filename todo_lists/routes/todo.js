express = require('express'),
router = express.Router();

// DB Tables
const user_todos = 'user_todos';
const todo_lists = 'todo_lists';

// GET LISTS
router.route('/:email').get((req, res, next) => {
	const { params } = req;
	const { email } = params;
	req.con.query(`SELECT * FROM ${user_todos} WHERE email = ?`, [email], (error, result) => {
		if (error) res.json({status: 'error', message: error, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		res.json({status: 'success', result: result, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
	});
});

// INSERT
router.route('/:user_id').put((req, res, next) => {
	const { body, params } = req;
	const { user_id } = params;
	const { title } = body;
	req.con.query(`INSERT INTO ${todo_lists} (user_id, title) VALUES (?,?) `, [user_id,title], (error, result) => {
		if (error) res.json({status: 'error', message: error, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		if(result){
			res.json({status: 'success', message: 'TODO has been added.', timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		}
	});
});

// UPDATE
router.route('/:todo_id').patch((req, res, next) => {
	const { body, params } = req;
	const { todo_id } = params;
	const { title, status } = body;
	req.con.query(`UPDATE ${todo_lists} SET title = ?, status = ? WHERE _id = ?`, [title,status,todo_id], (error, result) => {
		if (error) res.json({status: 'error', message: error, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		if(result){
			res.json({status: 'success', message: 'TODO has been updated.', timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		}
	});
});

// DELETE
router.route('/:todo_id').delete((req, res, next) => {
	const { body, params } = req;
	const { todo_id } = params;
	req.con.query(`DELETE FROM ${todo_lists} WHERE _id = ?`, [todo_id], (error, result) => {
		if (error) res.json({status: 'error', message: error, timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		if(result){
			res.json({status: 'success', message: 'TODO has been deleted.', timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
		}
	});
});

module.exports = router;