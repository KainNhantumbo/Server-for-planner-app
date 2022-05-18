const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name.'],
		trim: true,
		maxlength: [50, 'Name is too long.'],
	},
	surname: {
		type: String,
		required: [true, 'Please provide a surmane.'],
		trim: true,
		maxlength: [50, 'Surname is too long.'],
	},
	email: {
		type: String,
		required: [true, 'Please provide a user e-mail.'],
		trim: true,
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email.',
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password.'],
	},
});

module.exports = mongoose.model('User', userSchema);
