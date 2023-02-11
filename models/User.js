const mongoose = require("mongoose");
const { TaskSchema } = require("./Task");
const { Group } = require("./Group");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  tasks: [TaskSchema],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
