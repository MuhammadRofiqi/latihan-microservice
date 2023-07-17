const router =require("express").Router();

const controller = require("../../controllers/notes");
const authorize = require("../../middlewares/authorize");


router.post("/",authorize, controller.storeimage);

module.exports = router