const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Statuses = require("../models/Statuses");

const { DataTypes } = Sequelize;

const Patients = db.define("patients", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
  },
  phone: {
    type: DataTypes.STRING(25),
  },
  address: {
    type: DataTypes.TEXT,
  },
  status_id: {
    type: DataTypes.INTEGER,
  },
  in_date_at: {
    type: DataTypes.DATE,
  },
  out_date_at: {
    type: DataTypes.DATE,
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
});

Patients.belongsTo(Statuses, { foreignKey: "status_id" });

module.exports = Patients;
