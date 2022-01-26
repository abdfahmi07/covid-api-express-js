const { Router } = require("express");
const router = Router();

const PatientController = require("../controllers/PatientController");

router.get("/", PatientController.index);

module.exports = router;
