const Task = require('../models/task-model');
const BaseError = require('../errors/base-error');

const getTasks = async (req, res) => {
	const userID = req.user.user_id;
	const query_params = { createdBy: userID };
	const { search } = req.query;
	if (search) {
		query_params.task = { $regex: search, $options: 'i' };
	}
	const tasks = await Task.find(query_params).sort('-task');
	res.status(200).json({ results: tasks.length, data: tasks });
};

const createTask = async (req, res) => {
	req.body.createdBy = req.user.user_id;
	await Task.create(req.body);
	res.status(201).json({ status: 'Task created sucessfuly' });
};

const getSingleTask = async (req, res) => {
	const userID = req.user.user_id;
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID, createdBy: userID });
	if (!task) throw new BaseError('Task not found', 404);
	res.status(200).json({ results: task.length, data: task });
};

const updateTask = async (req, res) => {
	const userID = req.user.user_id;
	const { id: taskID } = req.params;
	if (!taskID) throw new BaseError('Resource ID required', 400);

	await Task.findOneAndUpdate(
		{
			_id: taskID,
			createdBy: userID,
		},
		req.body,
		{ new: true, runValidators: true }
	);
	res.status(202).json({ message: 'Task updated successfuly' });
};

const deleteTask = async (req, res) => {
	const userID = req.user.user_id;
	const { id: taskID } = req.params;
	await Task.findOneAndDelete({ _id: taskID, createdBy: userID });
	res.status(200).json({ message: 'Task deleted successfuly' });
};

module.exports = {
	getTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
};
