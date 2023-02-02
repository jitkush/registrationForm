const { check, validationResult } = require("express-validator/check");
const User = require("./../../models/userModel");

exports.createOrder = [
  check("user_id")
    .exists({ checkFalsy: true })
    .withMessage("user_id field cannot be empty")
    .isLength({ min: 6 })
    .withMessage("user_id should have atleast 6 character"),

  check("sub_total")
    .exists({ checkFalsy: true })
    .withMessage("Subtotal cannot be empty")
    .isNumeric()
    .withMessage("Subtotal should contain number only"),

  check("contactNumber")
    .exists({ checkFalsy: true })
    .withMessage("Contact number cannot be empty")
    .isNumeric()
    .withMessage("Contact number should contain number only")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number should be 10 digit"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
