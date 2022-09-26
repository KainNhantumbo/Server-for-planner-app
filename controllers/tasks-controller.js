const Task = require('../models/task-model');

const getTasks = async (req, res) => {
	try {
		const userID = req.user.user_id;
		const query_params = { createdBy: userID };
		const { search } = req.query;
		if (search) {
			query_params.task = { $regex: search, $options: 'i' };
		}
		const tasks = await Task.find(query_params).sort('-task');
		res.status(200).json({ results: tasks.length, data: tasks });
	} catch (err) {
		res.status(500).json({ err });
	}
};

const createTask = async (req, res) => {
	try {
		req.body.createdBy = req.user.user_id;
		await Task.create(req.body);
		res.status(201).json({ status: 'sucessfull' });
	} catch (err) {
		res.status(500).json({ err });
	}
};

const getSingleTask = async (req, res) => {
	try {
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

const updateTask = async (req, res) => {
	try {
		const userID = req.user.user_id;
		const { id: taskID } = req.params;
		if (!taskID) {
			return res.status(400).json({ message: 'Resource ID required.' });
		}
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

const deleteTask = async (req, res) => {
	try {
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
