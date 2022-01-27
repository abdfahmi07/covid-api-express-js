const { check } = require("express-validator");

const addPatientValidate = {
  name: {
    notEmpty: true,
    errorMessage: "Name is required",
  },
  phone: {
    notEmpty: {
      errorMessage: "Phone is required",
    },
    isLength: {
      errorMessage: "Number phone must be at least 10 chars long",
      options: { min: 10 },
    },
    isMobilePhone: {
      options: ["id-ID"],
      errorMessage: "Must provide a valid Indonesian phone number",
    },
  },
  address: {
    notEmpty: true,
    errorMessage: "Address is required",
  },
  status: {
    notEmpty: {
      errorMessage: "Status is required",
    },
    matches: {
      options: [/\b(?:Positive|Recovered|Dead)\b/],
      errorMessage:
        "Invalid status, choose status between Positive, Recovered or Dead",
    },
  },
};

const registerValidate = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name Must Be at Least 3 Characters")
    .trim()
    .escape(),
  check("email")
    .isEmail()
    .withMessage("Use a Valid Email Format")
    .trim()
    .escape()
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password Must Be at Least 8 Characters")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape(),
];

const loginValidate = [
  check("email").trim().escape().normalizeEmail(),
  check("password").trim().escape(),
];

module.exports = { addPatientValidate, registerValidate, loginValidate };
