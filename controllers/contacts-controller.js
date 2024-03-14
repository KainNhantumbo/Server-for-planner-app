const Contact = require('../models/contact-model');
const BaseError = require('../errors/base-error');

const getContacts = async (req, res) => {
	const userID = req.user.user_id;
	const { search } = req.query;
	const query_params = { createdBy: userID };
	if (search) {
		query_params.name = { $regex: search, $options: 'i' };
	}
	const contacts = await Contact.find(query_params).sort('name');
	res.status(200).json({ results: contacts.length, data: contacts });
};

const createContact = async (req, res) => {
	req.body.createdBy = req.user.user_id;
	await Contact.create(req.body);
	res.status(201).json({ message: 'Created.' });
};

const getSingleContact = async (req, res) => {
	const userID = req.user.user_id;
	const { id: contactID } = req.params;
	const contact = await Contact.findOne({
		_id: contactID,
		createdBy: userID,
	});
	if (!contact)
		throw new BaseError(`No such contact with id: ${contactID}`, 404);

	res.status(200).json({ data: contact });
};

const deleteContact = async (req, res) => {
	const userID = req.user.user_id;
	const { id: contactID } = req.params;
	await Contact.findOneAndDelete({ _id: contactID, createdBy: userID });
	res.status(200).json({ message: 'Deleted successfully.' });
};

const updateContact = async (req, res) => {
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
};

module.exports = {
	getContacts,
	createContact,
	getSingleContact,
	deleteContact,
	updateContact,
};
