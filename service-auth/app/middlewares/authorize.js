require("dotenv").config();
const jwt = require("jsonwebtoken")
module.exports = (req,res,next) => {
// get apikey from headers
  const token = req.headers["authorization"];

// check apikey
  if (typeof token == "undefined"|| token =="") {
    return res.boom.forbidden("access_denied");
  } 
  jwt.verify(token, process.env.JWT_SECRET_KEY,(err,passed)=>{
     if ( err) {
    return res.boom.unauthorized("access_denied");
  } else{
    req.user = passed
    next();
  }
  })
 
};