const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.CreateUser = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    contactNumber: req.body.contactNumber,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const error = newUser.validateSync();
  if (error) {
    res.status(400).json({ status: "Failed", data: error.errors });
  }
  res.status(201).json({ status: "Created", data: newUser });
});
