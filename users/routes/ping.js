express = require('express'),
router = express.Router();

//
router.route('/').get((req, res, next) => {
	res.json({status: 'success', message: 'API is running...', datetime: { seconds: new Date().getTime(), label: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' }) }});
});

module.exports = router;