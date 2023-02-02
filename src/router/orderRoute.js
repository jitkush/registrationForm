const express = require("express");
const Order = require("../controller/OrderController");
const validator = require("./../middleware/validator/orderValidation");
const router = express.Router();

router.post("/add-order", validator.createOrder, Order.createOrder);
router.get("/:user_id", Order.getOrder);

module.exports = router;
