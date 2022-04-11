const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Must provide a name'],
		trim: true,
		maxlength: [25, 'Name can not be more than 25 characters.'],
	},
	surname: {
		type: String,
		trim: true,
		maxlength: [25, 'Surname can not be more than 25 characters.'],
	},
	phone: Number,
	celular: Number,
	email: String,
	website: String,
	adress: String,
});

module.exports = mongoose.model('Contact', contactSchema);
