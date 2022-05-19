const Task = require('../models/task-model');

// gets all the stored tasks
const getTasks = async (req, res) => {
	try {
		// picks the user id from request
		const userID = req.user.user_id;
		// finds the user data
		const tasks = await Task.find({ createdBy: userID }).sort('createdAt');
		res.status(200).json({ results: tasks.length, data: tasks });
	} catch (err) {
		res.status(500).json({ err });
	}
};

// create a new user task
const createTask = async (req, res) => {
	try {
		// populates request body object with the user id
		req.body.createdBy = req.user.user_id;
		await Task.create(req.body);
		res.status(201).json({ status: 'sucessfull' });
	} catch (err) {
		res.status(500).json({ err });
	}
};

// gets a single task by id in req.params object
const getSingleTask = async (req, res) => {
	try {
		// picks the user id from request
		const userID = req.user.user_id;
		const { id: taskID } = req.params;
		const task = await Task.findOne({ _id: taskID, createdBy: userID });
		if (!task) {
			return res.status(404).json({ message: 'Task not found.' });
		}
		res.status(200).json({ results: task.length, data: task });
	} catch (err) {
		res.status(500).json({ err });
	}
};

// updates a user stored task
const updateTask = async (req, res) => {
	try {
		// picks the user id from request
		const userID = req.user.user_id;
		const { id: taskID } = req.params;
		// cheks if the task id is present
		if (!taskID) {
			return res.status(400).json({ message: 'Resource ID required.' });
		}
		// updates the task
		const updatedTask = await Task.findOneAndUpdate(
			{
				_id: taskID,
				createdBy: userID,
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

// deletes a user task
const deleteTask = async (req, res) => {
	try {
		// picks the user id from request
		const userID = req.user.user_id;
		const { id: taskID } = req.params;
		await Task.findOneAndDelete({ _id: taskID, createdBy: userID });
		res.status(200).json({ message: 'Deleted successfully' });
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
