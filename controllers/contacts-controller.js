const Contact = require('../models/contact-model');

const getContacts = async (req, res) => {
	try {
		const contacts = await Contact.find({});
		res.status(200).json(contacts);
	} catch (err) {
		res.status(500).json({ err });
	}
};

const saveContact = async (req, res) => {
	try {
		const newContact = await Contact.create(req.body);
		res.status(201).json(newContact);
	} catch (err) {
		res.status(500).json({ err });
	}
};

const getSingleContact = async (req, res) => {
	try {
		// contact id as contactID (alias of id) from req.params
		const { id: contactID } = req.params;
		const contact = await Contact.findOne({ _id: contactID });

		// if contact is not found
		if (!contact) {
			return res
				.status(404)
				.json({ message: `No such contact with id: ${contactID}` });
		}
		res.status(200).json(contact);
	} catch (err) {
		res.status(500).json({ err });
	}
};

const deleteContact = async (req, res) => {
	try {
		const { id: contactID } = req.params;
		const deletedContact = await Contact.findOneAndDelete({ _id: contactID });
		if (!deletedContact) {
			return res
				.status(404)
				.json({ message: `No such contact with id: ${contactID}` });
		}
		res.status(200).json({ message: 'Deleted sucessfully.' });
	} catch (err) {
		res.status(500).json(err);
	}
};

const updateContact = async (req, res) => {
	try {
		const { id: contactID } = req.params;
		const updatedContact = await Contact.findOneAndUpdate(
			{ _id: contactID },
			req.body,
			{
				runValidators: true,
				new: true,
			}
		);

		if (!updatedContact) {
			return res
				.status(404)
				.json({ message: `No such contact with id: ${contactID}` });
		}
		res.status(200).json({ message: 'Updated sucessfully.' });
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getContacts,
	saveContact,
	getSingleContact,
	deleteContact,
	updateContact,
};
