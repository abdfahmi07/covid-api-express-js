const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Patients = require("../models/Patients");

const { DataTypes } = Sequelize;

const Statuses = db.define("statuses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
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

// Statuses.has(Patients);

module.exports = Statuses;
