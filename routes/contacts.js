const express = require('express');
const router = express.Router();
const {
	getContacts,
	saveContact,
	getSingleContact,
	deleteContact,
	updateContact,
} = require('../controllers/contacts-controller');

router.route('/').get(getContacts).post(saveContact);

router
	.route('/:id')
	.get(getSingleContact)
	.delete(deleteContact)
	.patch(updateContact);

module.exports = router;
