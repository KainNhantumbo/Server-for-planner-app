const express = require('express');
const router = express.Router();
const asyncWrapper = require('../errors/error-catcher');
const {
	getContacts,
	createContact,
	getSingleContact,
	deleteContact,
	updateContact,
} = require('../controllers/contacts-controller');

router
	.route('/')
	.get(asyncWrapper(getContacts))
	.post(asyncWrapper(createContact));

router
	.route('/:id')
	.get(asyncWrapper(getSingleContact))
	.delete(asyncWrapper(deleteContact))
	.patch(asyncWrapper(updateContact));

module.exports = router;
