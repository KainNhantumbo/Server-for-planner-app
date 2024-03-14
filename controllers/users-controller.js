const User = require('../models/User-model');
const Contact = require('../models/contact-model');
const Task = require('../models/task-model');

const getUserData = async (req, res) => {
	const user_id = req.user.user_id;
	const user_info = await User.find({ _id: user_id }).select('-password');
	const tasks = await Task.find({ createdBy: user_id }).select('task');
	const contacts = await Contact.find({ createdBy: user_id }).select('name');
	const data = {
		user: user_info,
		tasks_saved: tasks.length,
		contacts_saved: contacts.length,
	};
	res.status(200).json(data);
};

const deleteUser = async (req, res) => {
	const user_id = req.user.user_id;
	await User.findOneAndDelete({ _id: user_id });
	await Task.deleteMany({ _id: user_id });
	await Contact.deleteMany({ _id: user_id });
	res.status(200).json({ message: 'Account deleted.' });
};

module.exports = { getUserData, deleteUser };
