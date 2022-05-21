const User = require('../models/User-model');
const Contact = require('../models/contact-model');
const Task = require('../models/task-model');

// gets user data
const getUserData = async (req, res) => {
	try {
		const user_id = req.user.user_id;
		// gets user data excluding password
		const user_info = await User.find({ _id: user_id }).select('-password');
		// gets tasks from database
		const tasks = await Task.find({ createdBy: user_id }).select('task');
		// gets contacts(name) from database
		const contacts = await Contact.find({ createdBy: user_id }).select('name');

		const data = {
			user: user_info,
			tasks_saved: tasks.length,
			contacts_saved: contacts.length,
		};

		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ err });
	}
};

// deletes authenticated user from database
const deleteUser = async (req, res) => {
	try {
		const user_id = req.user.user_id;
		await User.findOneAndDelete({ _id: user_id });
		res.status(200).json({ message: 'Account deleted.' });
	} catch (err) {
		res.status(500).json({ err });
	}
};

module.exports = { getUserData, deleteUser };
