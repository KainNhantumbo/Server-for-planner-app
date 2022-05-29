const Contact = require('../models/contact-model');

const getContacts = async (req, res) => {
	try {
		const userID = req.user.user_id;
		const { search } = req.query;
		const query_params = { createdBy: userID };
		if (search) {
			query_params.name = { $regex: search, $options: 'i' };
		}
		const contacts = await Contact.find(query_params).sort('name');
		res.status(200).json({ results: contacts.length, data: contacts });
	} catch (err) {
		res.status(500).json({ err });
	}
};

const createContact = async (req, res) => {
	try {
		req.body.createdBy = req.user.user_id;
		await Contact.create(req.body);
		res.status(201).json({ message: 'Created.' });
	} catch (err) {
		res.status(500).json({ err });
	}
};

const getSingleContact = async (req, res) => {
	try {
		const userID = req.user.user_id;
		const { id: contactID } = req.params;
		const contact = await Contact.findOne({
			_id: contactID,
			createdBy: userID,
		});
		if (!contact) {
			return res
				.status(404)
				.json({ message: `No such contact with id: ${contactID}` });
		}
		res.status(200).json({ data: contact });
	} catch (err) {
		res.status(500).json({ err });
	}
};

const deleteContact = async (req, res) => {
	try {
		const userID = req.user.user_id;
		const { id: contactID } = req.params;
		await Contact.findOneAndDelete({ _id: contactID, createdBy: userID });
		res.status(200).json({ message: 'Deleted successfully.' });
	} catch (err) {
		res.status(500).json(err);
	}
};

const updateContact = async (req, res) => {
	try {
		const userID = req.user.user_id;
		const { id: contactID } = req.params;
		await Contact.findOneAndUpdate(
			{ _id: contactID, createdBy: userID },
			req.body,
			{
				runValidators: true,
				new: true,
			}
		);
		res.status(200).json({ message: 'Updated successfully.' });
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getContacts,
	createContact,
	getSingleContact,
	deleteContact,
	updateContact,
};
