const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/login", userController.login);
router.patch("/update", auth, multer, userController.update);
router.post("/register", multer, userController.register);

module.exports = router;
