var jwt = require('jsonwebtoken');
require('dotenv').config();
var parseUrl = require('parseurl');

module.exports = {

asyncverifyJWT(req, res, next){
    var pathname = parseUrl(req).pathname;
    console.log("url: " + pathname);
    if(pathname !== '/logar')
    {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    if (token == "" || token == null) return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
      req.userId = decoded.id;    
      next();
    });
    }
    else{
        next();
    }
},

}