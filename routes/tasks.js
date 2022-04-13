const express = require('express');
const router = express.Router();
const Task = require('../models/task-model');

router
	.route('/')
	.get(async (req, res) => {
		try {
			const tasks = await Task.find({});
			res
				.status(200)
				.json({ data: tasks, length: tasks.length, status: 'sucessfull' });
		} catch (err) {
			res.status(500).json({ err });
		}
	})
	.post(async (req, res) => {
		try {
			const newTask = req.body;
			await Task.create(newTask);
		} catch (err) {
			res.status(500).json({ err });
		}
	});

router.route(':id').get(async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = Task.findOne({ _id: taskID });

		if (!task) {
			res.status(404).json({ message: 'Task not found.' });
		}

		res
			.status(200)
			.json({ data: task, status: 'sucessfull', length: task.length });
	} catch (err) {
		res.status(500).json({ err });
	}
});
module.exports = router;
