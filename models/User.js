const mongoose = require("mongoose");
const { TaskSchema } = require("./Task");
const { GroupSchema } = require("./Group");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  password: String,
  tasks: [TaskSchema],
  groups: [GroupSchema],
});

module.exports = mongoose.model("User", UserSchema);
