const jwt = require('jsonwebtoken');
require('dotenv').config();
// require('dotenv').config({path: __dirname + '/.env'});
module.exports = async function (req, res, next) {
  var token = req.headers['x-access-token'];
  if(!token){  
    req.authenticated = false;
    res.json({status: 'warning', message: 'Invalid token, please login.', timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
  } else {        
    // Verify
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    const _expToken = decode.exp * 1000;
    const _now = new Date().getTime();
    if(_now < _expToken){
      req.authenticated = true;
      next()  
    } else {
      req.authenticated = false;
      res.json({status: 'warning', message: 'Expired token, please login.', timestamp: new Date().toLocaleString('en-Us', { timeZone: 'Asia/Manila' })});
    }
  }
}