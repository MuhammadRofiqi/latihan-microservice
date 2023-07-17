const router = require("express").Router();

// call all routes v1
router.use("/auth", require("./auth"));

module.exports = router;