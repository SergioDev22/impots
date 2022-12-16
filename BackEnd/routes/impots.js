const express = require("express");
const auth = require("../middleware/auth");
const multer = require("./../middleware/multer_facture");
const impotController = require("../controllers/impots");

const router = express.Router();

router.get("/history", auth, impotController.history);
router.post("/", auth, multer, impotController.create);

module.exports = router;
