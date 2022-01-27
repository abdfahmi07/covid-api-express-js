const { Router } = require("express");
const { checkSchema } = require("express-validator");
const {
  addPatientValidate,
  registerValidate,
  loginValidate,
} = require("../middleware/validation");
const PatientController = require("../controllers/PatientController");
const AuthController = require("../controllers/AuthController");
const verifyToken = require("../middleware/verifyToken");
const router = Router();

router.get("/api/patients", PatientController.index);
router.post(
  "/api/patients",
  [checkSchema(addPatientValidate), verifyToken],
  PatientController.store
);
router.put("/api/patients/:id", verifyToken, PatientController.update);
router.delete("/api/patients/:id", verifyToken, PatientController.destroy);
router.get("/api/patients/:id", verifyToken, PatientController.show);
router.get("/api/patients/search/:name", verifyToken, PatientController.search);
router.get(
  "/api/patients/status/positive",
  verifyToken,
  PatientController.positive
);
router.get(
  "/api/patients/status/recovered",
  verifyToken,
  PatientController.recovered
);
router.get("/api/patients/status/dead", verifyToken, PatientController.dead);

router.post("/api/register", registerValidate, AuthController.register);
router.post("/api/login", loginValidate, AuthController.login);

module.exports = router;
