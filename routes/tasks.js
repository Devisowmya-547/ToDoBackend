const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get all tasks
router.get('/:id', async (req, res) => {
  try {
    const tasks = await Task.find({owner : req.params.id});
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, category, priority, deadline, owner } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      category,
      priority,
      deadline,
      owner,
    });

    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(400).send('Error creating task');
  }
});

// Update task status (mark as complete)
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task.isCompleted = !task.isCompleted;
    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
