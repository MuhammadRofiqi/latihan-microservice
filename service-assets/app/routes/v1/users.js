const router =require("express").Router();

const controller = require("../../controllers/users");
const authorize = require("../../middlewares/authorize");


router.post("/",authorize, controller.storeavatar);

module.exports = router