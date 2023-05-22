const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messageTitle: { type: String, required: true },
    messageContent: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
