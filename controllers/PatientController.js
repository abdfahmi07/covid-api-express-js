const Patients = require("../models/Patients");
const Statuses = require("../models/Statuses");
class PatientController {
  async index(req, res) {
    try {
      const patients = await Patients.findAll({ include: Statuses });
      res.send(patients);
    } catch (err) {
      console.log(err);
    }
  }
}

const obj = new PatientController();
module.exports = obj;
