const { check, validationResult } = require("express-validator/check");
const User = require("./../../models/userModel");

exports.createUser = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name field cannot be empty")
    .isAlpha()
    .withMessage("Name should have aplhabets only")
    .isLength({ min: 2 })
    .withMessage("name should have atleast 2 character"),

  check("contactNumber")
    .exists({ checkFalsy: true })
    .withMessage("Contact number cannot be empty")
    .isNumeric()
    .withMessage("Contact number should contain number only")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number should be 10 digit")
    .custom(async (val) => {
      const user = await User.findOne({ contactNumber: val });
      if (user) {
        throw new Error(
          "Contact already present. recover or try another number"
        );
      }
    }),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password cannot be empty")
    .isAlphanumeric()
    .withMessage("Password should contain alphabet and atleast 1 number ")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 characters"),

  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Password cannot be empty. Please enter your password")
    .isAlphanumeric()
    .withMessage("Password should contain alphabet and atleast 1 number ")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(422).json({ errors: "Password do not match" });
    }
    next();
  },
];

exports.loginValidator = [
  check("contactNumber")
    .exists({ checkFalsy: true })
    .withMessage("Contact number cannot be empty")
    .isNumeric()
    .withMessage("Contact number should contain number only")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number should be 10 digit"),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password cannot be empty")
    .isAlphanumeric()
    .withMessage("Password should contain alphabet and atleast 1 number ")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
