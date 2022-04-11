const express = require('express');
const router = express.Router();
const Contact = require('../models/contact-model');

router
	.route('/')
	.get(async (req, res) => {
		try {
			const contacts = await Contact.find({});
			res.status(200).json(contacts);
		} catch (err) {
			res.status(500).json({ err });
		}
	})

	.post(async (req, res) => {
		try {
			const newContact = await Contact.create(req.body);
			res.status(201).json(newContact);
		} catch (err) {
			console.log(err);
			res.status(500).json({ err });
		}
	});

module.exports = router;
