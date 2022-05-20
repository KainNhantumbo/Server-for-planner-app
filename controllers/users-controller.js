const User = require('../models/User-model');
const Contact = require('../models/contact-model');
const Task = require('../models/task-model');

// gets user data
const getUserData = async (req, res) => {
	try {
		const user_id = req.user.user_id;
		// gets user data excluding password
		const user_info = await User.find({ _id: user_id }).select(
			'-password'
		);
		// gets tasks from database
		const tasks = await Task.find({ createdBy: user_id }).select('task');
		// gets contacts(name) from database
		const contacts = await Contact.find({ createdBy: user_id }).select('name');

		// packs all user data
		const data = {
			user: user_info,
			tasks_saved: tasks.length,
			contacts_saved: contacts.length,
		};

		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ err });
	}
}

module.exports=getUserData