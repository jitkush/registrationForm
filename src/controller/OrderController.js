const Order = require("./../models/orderModel");
const catchAsync = require("./../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res) => {
  const newOrder = await Order.create({
    user_id: req.body.user_id,
    sub_total: req.body.sub_total,
    contactNumber: req.body.contactNumber,
  });

  const error = newOrder.validateSync();
  if (error) {
    res.status(400).json({ status: "Failed", data: error.errors });
  }
  res.status(201).json({ status: "Created", data: newOrder });
});

exports.getOrder = catchAsync(async (req, res) => {
  const findOrder = await Order.find({ user_id: req.params.user_id });
  if (!findOrder) {
    res
      .status(404)
      .json({ status: "Failed", data: "No order with the user id was found" });
  } else {
    res.status(200).json({ status: "Success", data: findOrder });
  }
});
