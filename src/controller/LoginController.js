const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");

const catchAsync = require("./../utils/catchAsync");

exports.loginController = catchAsync(async (req, res) => {
  let request = req.body;
  let user = await User.findOne({
    contactNumber: request.contactNumber,
  }).select("+password");

  if (!user || !(await bcrypt.compare(request.password, user.password))) {
    res.status(400).json({
      status: "Login failed",
      data: "Please enter a valid contact number/password",
    });
  } else {
    let token = "abc";
    res.status(200).json({ status: "Login Success", data: token });
  }
});
