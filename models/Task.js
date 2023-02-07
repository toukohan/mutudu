const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  date: Date,
  title: String,
  description: String,
  // attachments: ?
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task, TaskSchema };
