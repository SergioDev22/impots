const express = require("express");
const multer = require("../middleware/multer");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", multer, userController.register);

module.exports = router;
