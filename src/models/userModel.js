const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//for creating new Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, "Name shoulld have atleast 2 alphabets"],
    required: [true, "This field cannot be empty"],
  },
  contactNumber: {
    type: Number,
    required: [true, "This field cannot be empty"],
    minLength: [10, "Contact number should be 10 digits"],
    maxLength: [10, "Contact number should be 10 digits"],
    required: [true, "This field cannot be empty"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "cannot be empty"],
    minLength: [6, "Password should be of minimum 6 character"],
  },

  confirmPassword: {
    type: String,
    minLength: [6, "Password should be of minimum 6 character"],
    required: [true, "cannot be empty"],
    validate: {
      validator: function (confirmPassword) {
        return confirmPassword === this.password;
      },
      message: "Password do not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  this.confirmPassword = hash;
  next();
});

//for creating a collection

const User = mongoose.model("User", userSchema);

module.exports = User;
