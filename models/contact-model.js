const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	name: String,
	surname: String,
	phone: Number,
	celular: Number,
	email: String,
	website: String,
	adress: String,
});

module.exports = mongoose.model('Contact', contactSchema);
