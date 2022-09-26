const express = require('express');
const asyncWrapper = require('../errors/error-catcher');
const router = express.Router();
const {
	getTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
} = require('../controllers/tasks-controller');

router.route('/').get(asyncWrapper(getTasks)).post(asyncWrapper(createTask));

router
	.route('/:id')
	.get(asyncWrapper(getSingleTask))
	.patch(asyncWrapper(updateTask))
	.delete(asyncWrapper(deleteTask));

module.exports = router;
