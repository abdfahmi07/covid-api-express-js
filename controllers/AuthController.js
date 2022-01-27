const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Users = require("../models/users");

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const emailIsExist = await Users.find({ email: email });

    if (emailIsExist.length > 0)
      return res.status(422).json({
        message: "Email has already been taken",
      });

    const createdUser = await Users.create(req.body);
    const response = {
      message: "User successfully created",
      user: createdUser,
    };

    res.status(200).json(response);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const users = await Users.find({ email: email });

    if (users.length < 1)
      return res.status(401).json({
        message: "User not found",
      });

    const [user] = users;
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json({
        message: "Invalid password",
      });

    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const response = {
      message: "Login successfully",
      user,
      access_token: token,
    };

    res.status(200).json(response);
  }
}

const obj = new AuthController();
module.exports = obj;
