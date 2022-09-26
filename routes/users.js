const { getUserData, deleteUser } = require('../controllers/users-controller');
const router = require('express').Router();
const asyncWrapper = require('../errors/error-catcher');

router
	.route('/')
	.get(asyncWrapper(getUserData))
	.delete(asyncWrapper(deleteUser));

module.exports = router;
