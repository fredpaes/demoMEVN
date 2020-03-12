const express = require('express');
const Task = require('~/models/Task');

const router = express.Router();

router.get('/', async (req, res) => {
  let data = await Task.find();
  res.json({ status: true, data });
})

router.post('/', async (req, res) => {
  let task = new Task(req.body);
  await task.save();
  res.json({ status: true, data: 'Task saved' });
})

router.put('/:id', async (req, res) => {
  let { id } = req.params;
  await Task.findByIdAndUpdate(id, req.body);
  res.json({ status: true, data: 'Task updated' });
})

router.delete('/:id', async (req, res) => {
  let { id } = req.params;
  await Task.findByIdAndRemove(id);
  res.json({ status: true, data: 'Task deleted' });
})

module.exports = router;
