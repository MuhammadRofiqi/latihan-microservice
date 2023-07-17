const service = require("../helpers/service")

module.exports = async(req, res, next) => {
  try {
    const data = await service("auth").get("/v1/auth/verify",{
      headers:{
        Authorization: req.headers["authorization"],
      }
    });
      req.user = data.data.payload;
      next();
    
  } catch (error) {
    return res.boom.forbidden(error.response.data.message);
  }



};