const Task = require('../models/task-model');

// gets all the stored tasks
const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		console.log(req.user);
		res
			.status(200)
			.json({ data: tasks, length: tasks.length, status: 'sucessfull' });
	} catch (err) {
		res.status(500).json({ err });
	}
};

// create a new task
const createTask = async (req, res) => {
	try {
		const newTask = req.body;
		await Task.create(newTask);
		res.status(201).json({ status: 'sucessfull' });
	} catch (err) {
		res.status(500).json({ err });
	}
};

// gets a single task by id in req.params object
const getSingleTask = async (req, res) => {
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
};

// updates a stored task
const updateTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		// cheks if the task is present
		if (!taskID) {
			return res.status(400).json({ message: 'Resource ID required.' });
		}
		// updates the task
		const updatedTask = await Task.findOneAndUpdate(
			{
				_id: taskID,
			},
			req.body,
			{ new: true, runValidators: true }
		);

		if (!updatedTask) {
			return res.status(500).json({ message: 'Update failed.' });
		}
		res.status(202).json({ message: 'Updated successfully.' });
	} catch (err) {
		res.status(500).json({ err });
	}
};

// deletes a task
const deleteTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		await Task.findOneAndDelete({ _id: taskID });
		res.status(200).json({ status: 'sucessfull' });
	} catch (err) {
		res.status(500).json({ err });
	}
};

module.exports = {
	getTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
};
