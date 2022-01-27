const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  in_date_at: {
    type: Date,
    default: Date.now,
  },
  out_date_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

const Patient = model("Patient", patientSchema);
module.exports = Patient;
