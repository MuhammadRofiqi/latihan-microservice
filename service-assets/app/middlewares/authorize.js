require("dotenv").config();

module.exports = (req,res,next) => {
// get apikey from headers
  const apikey = req.headers["authorization"];
  // console.log(req.headers);


// check apikey
  if (typeof apikey == "undefined"|| apikey =="") {
    return res.boom.forbidden("access_denied");
  } else if ( apikey !== process.env.API_KEY) {
    return res.boom.forbidden("access_denied");
  } else{
    next();
  }
};