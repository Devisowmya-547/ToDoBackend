const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
  },
  deadline: Date,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type : String,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
