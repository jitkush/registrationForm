const express = require("express");
const app = express();
const userSignup = require("./router/userRouter");
const order = require("./router/orderRoute");

require("dotenv").config({ path: `${__dirname}/../../config.env` });
require("./db/connection");

const port = process.env.PORT || 3001;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("hello from home page");
});

app.use("/user/", userSignup);
app.use("/order/", order);

app.listen(port, () => {
  console.log(`server is runnning ${port}`);
});
