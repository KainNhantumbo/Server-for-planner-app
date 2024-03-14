const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Must provide a name.'],
			trim: true,
			maxlength: [25, 'Name can not be more than 25 characters.'],
		},
		surname: {
			type: String,
			trim: true,
			maxlength: [25, 'Surname can not be more than 25 characters.'],
		},
		phone: String,
		celular: String,
		email: String,
		website: String,
		adress: String,
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide a user.'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
