const router =require("express").Router();
const authorize = require("../../middlewares/authorize");

router.use("/notes",authorize,require("./notes"));
// router.use("/labels",authorize,require("./labels"));

module.exports = router