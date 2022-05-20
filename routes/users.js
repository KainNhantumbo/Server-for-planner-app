const express = require('express');
const router = express.Router();
const User = require('../models/User-model');
const Contact = require('../models/contact-model');
const Task = require('../models/task-model');

router.get('/', async (req, res) => {
	try {
		const user_id = req.user.user_id;
		// gets user data excluding password
		const user_info = await User.find({ createdBy: user_id }).select(
			'-password'
		);
		const tasks = await Task.find({ createdBy: user_id }).select('task');
		const contacts = await Contact.find({ createdBy: user_id }).select('name');

		const user_data = {
			user: user_info,
			tasks_saved: tasks.length,
			contacts_saved: contacts.length,
		};

		res.status(200).json({});
	} catch (err) {
		res.status(500).json({ err });
	}
});

module.exports = router;
