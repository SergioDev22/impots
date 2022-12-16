const express = require("express");
const auth = require("../middleware/auth");
const habilitationController = require("../controllers/habilitations");

const router = express.Router();

router.get("/", auth, habilitationController.getEmpowerment);
router.post("/", auth, habilitationController.createEmpowerment);
router.patch("/:id", auth, habilitationController.updateEmpowerment);
router.delete("/:id", auth, habilitationController.deleteEmpowerment);

module.exports = router;
