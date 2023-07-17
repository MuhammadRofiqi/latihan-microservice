const router =require("express").Router();

// call route versions
router.use("/v1", require("./v1"));

module.exports = router;