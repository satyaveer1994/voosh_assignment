const orderModel = require("../models/orderModel");
const validator = require("../middelwear/validator");

const createOrder = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        status: false,
        message: "Please enter required  Data ",
      });
    }
    const { user_Id, phone, item, sub_total } = data;

    if (!validator.isValid(user_Id)) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter user_Id" });
    }
    const user = await userModel.findById(user_Id);
    if (!validator.isValid(user)) {
      return res.status(400).send({ status: false, massage: "user not found" });
    }

    if (!validator.isValid(phone)) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter phone" });
    }

    if (!validator.isValid(item)) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter item" });
    }

    if (!validator.isValid(sub_total)) {
      return res
        .status(400)
        .send({ status: false, massage: "please enter sub_total" });
    }

    let createOrders = await orderModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "successful", data: createOrders });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getOrder = async function (req, res) {
  try {
    const { user_id } = req.query;
    const users = await userModel.findById(user_id);
    if (!validator.isValid(users)) {
      return res
        .status(400)
        .send({ status: false, massage: "users not found" });
    }
    const orders = await orderModel.find({ user_id });
    return res
      .status(201)
      .send({ status: true, message: "successful", data: orders });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createOrder, getOrder };
