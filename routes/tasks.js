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
			res.status(201).json({ status: 'sucessfull' });
		} catch (err) {
			res.status(500).json({ err });
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const { id: taskID } = req.params;
			const task = await Task.findOne({ _id: taskID });

			if (!task) {
				res.status(404).json({ message: 'Task not found.' });
			}

			res
				.status(200)
				.json({ data: task, status: 'sucessfull', length: task.length });
		} catch (err) {
			res.status(500).json({ err });
		}
	})
	.patch(async (req, res) => {
		try {
			const { id: taskID } = req.params;
			const updatedTask = await Task.findOneAndUpdate(
				{
					_id: taskID,
				},
				req.body,
				{ new: true, runValidators: true }
			);

			if (!updatedTask) {
				return res.status(304).json({ status: 'failed' });
			}
			res.status(202).json({ status: 'sucessfull' });
		} catch (err) {
			res.status(500).json({ err });
		}
	})
	.delete(async(req, res)=> {
		try {
			const {id: taskID} =req.params;
		} catch (err) {
			
		}
	});

module.exports = router;
