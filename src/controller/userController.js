const userModel = require("../models/userModel");
const validator = require("../middelwear/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registration = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        status: false,
        message: "Please enter Data like tile,fullname etc",
      });
    }
    const { name, phone, email, password } = data;

    if (!validator.isValid(name)) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter name" });
    }

    if (!validator.isValid(phone)) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter phone" });
    }

    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter email" });
    }
    if (!validator.isValidEmail(email)) {
      return res.status(400).send({
        status: false,
        massage: "please enter correct email like:- abc@gmail.com",
      });
    }

    // checking unique
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send({ status: false, message: "email already in use" });
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter password" });
    }
    if (password.length < 6 || password.length > 15) {
      return res.status(400).send({
        status: false,
        massage: "please length should be 6 to 15 password",
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    data.password = hash;

    let createUser = await userModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "successful", data: createUser });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    Data = req.body;

    if (Object.keys(Data) == 0) {
      return res.status(400).send({
        status: false,
        message: "Please provide email id or password",
      });
    }
    const { email, password } = Data;
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Email is required` });
    }
    if (!validator.isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Email is not correct ` });
    }

    if (!validator.isValid(password)) {
      res.status(400).send({ status: false, message: `password is required` });
      return;
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send({ status: false, message: "email is wrong" });
    }
    const decrpted = bcrypt.compareSync(password, user.password);
    if (decrpted == true) {
      const token = await jwt.sign(
        {
          UserId: user._id,
        },
        "voosh"
      );

      res.setHeader("x-api-key", token);
      return res
        .status(200)
        .send({ status: true, message: "login Successful", token: token });
    } else {
      res.status(400).send({ status: false, message: "password is incorrect" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { registration, loginUser };
