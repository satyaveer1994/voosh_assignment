//const { Schema } = require("mongoose");

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    sub_total: {
      type: Number,
      required: true,
    },
  },
  { timestemp: true }
);

module.exports = mongoose.model("order", orderSchema);
