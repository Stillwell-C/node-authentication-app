const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    membershipStatus: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
