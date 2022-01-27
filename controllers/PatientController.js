const Patients = require("../models/patients");
const { validationResult } = require("express-validator");

class PatientController {
  async index(req, res) {
    const patients = await Patients.find();
    if (patients.length < 1)
      return res.status(200).json({ message: "Data is empty" });

    const response = {
      message: "Get all resource",
      data: patients,
    };

    res.status(200).json(response);
  }

  async store(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(422).json({
        message: "All fields must be filled correctly",
        errors: errors.array(),
      });

    const createdPatient = await Patients.create(req.body);
    const response = {
      message: "Resource is added successfully",
      data: createdPatient,
    };

    res.status(201).json(response);
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      await Patients.updateOne({ _id: id }, req.body);
      const updatedPatient = await Patients.find({ _id: id });
      const response = {
        message: "Resource is update successfully",
        data: updatedPatient,
      };
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const deletedPatient = await Patients.deleteOne({ _id: id });
      if (deletedPatient.deletedCount < 1)
        return res.status(404).json({
          message: "Resource not found",
        });

      return res.status(200).json({
        message: "Resource is delete successfully",
      });
    } catch (err) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const patient = await Patients.findById(id).exec();

      if (!patient)
        return res.status(404).json({
          message: "Resource not found",
        });

      const response = {
        message: "Get Detail Resource",
        data: patient,
      };

      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }
  }

  async search(req, res) {
    const { name } = req.params;
    const patients = await Patients.find({
      name: { $regex: `.*${name}.*`, $options: "i" },
    });

    if (patients.length < 1)
      return res.status(404).json({
        message: "Resource not found",
      });

    const response = {
      message: "Get searched resource",
      data: patients,
    };

    res.status(200).json(response);
  }

  async positive(req, res) {
    const positivePatients = await Patients.find({
      status: "Positive",
    });
    const response = {
      message: "Get positive resource",
      total: positivePatients.length,
      data: positivePatients,
    };

    res.status(200).json(response);
  }

  async recovered(req, res) {
    const recoveredPatients = await Patients.find({
      status: "Recovered",
    });
    const response = {
      message: "Get recovered resource",
      total: recoveredPatients.length,
      data: recoveredPatients,
    };

    res.status(200).json(response);
  }

  async dead(req, res) {
    const deadPatients = await Patients.find({
      status: "Dead",
    });
    const response = {
      message: "Get dead resource",
      total: deadPatients.length,
      data: deadPatients,
    };

    res.status(200).json(response);
  }
}

const obj = new PatientController();
module.exports = obj;
