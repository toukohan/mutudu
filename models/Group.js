const mongoose = require("mongoose");
const { TaskSchema } = require("./Task");

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  tasks: [TaskSchema],
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = { Group, GroupSchema };
