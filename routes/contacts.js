const express = require('express');
const router = express.Router();
const Contact = require('../models/contact-model');

router
	.route('/')
	.get((req, res) => {
		res.status(200).json({ name: 'Lara Crawller', number: 782398374 });
	})
	.post(async (req, res) => {
		try {
			const newContact = await Contact.create(req.body);
			res.status(201).json(newContact);
		} catch (err) {
			console.log(err);
		}
	});

module.exports = router;
