const mongoose = require('mongoose');

const Task = new mongoose.Schema({
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
});

module.exports = mongoose.model('Task', Task);
