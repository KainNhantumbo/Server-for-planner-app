const express = require('express');
const router = express.Router();
const {
	getTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
} = require('../controllers/tasks-controller');
const authUser = require('../middlewares/auth')

router.route('/').get(authUser, getTasks).post(createTask);

router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
