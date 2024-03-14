const mongoose = require('mongoose');

const Task = new mongoose.Schema(
	{
		task: {
			required: true,
			type: String,
			trim: false,
			default: '',
			maxlength: 50000,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide a user.'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Task', Task);
