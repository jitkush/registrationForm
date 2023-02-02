const mongoose = require("mongoose");
//creting Schema for orders
const OrderModel = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User id cannot be empty"],
  },

  sub_total: {
    type: Number,
    required: [true, "Order count cannot be empty"],
  },

  contactNumber: {
    type: Number,
    required: [true, "Order count cannot be empty"],
    maxLength: [10, "Contact number should have 10 digits"],
    minLength: [10, "Contact number should have 10 digits"],
  },
});

//creating collection for Order
const Order = mongoose.model("Order", OrderModel);
module.exports = Order;
