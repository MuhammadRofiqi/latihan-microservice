const router = require("express").Router();

// controller
const controller = require("../../controllers/notes");

router.post("/", controller.addNote);

module.exports = router;
