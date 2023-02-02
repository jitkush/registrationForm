const express = require("express");
const SignupController = require("../controller/SignupController");
const LoginController = require("../controller/LoginController");
const validator = require("../middleware/validator/userValidator");
const router = express.Router();

router.post("/add-user", validator.createUser, SignupController.CreateUser);
router.post(
  "/login-user",
  validator.loginValidator,
  LoginController.loginController
);

module.exports = router;
