// models/farmer.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true }, // Unique mobile number
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving
farmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Farmer", farmerSchema);