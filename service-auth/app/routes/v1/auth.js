const router = require("express").Router();

const authorize = require("../../middlewares/authorize");
// controller
const controller = require("../../controller/auth");

router.get("/verify", controller.verify)
// route POST
router.post("/register", controller.register);
router.post("/login", controller.login);

// route patch
router.patch("/user/avatar", authorize, controller.updateavatar);

module.exports = router;
