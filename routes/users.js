const express = require('express');
const router = express.Router();
const { getUserData, deleteUser } = require('../controllers/users-controller');

// route to get user data
router.route('/').get(getUserData).delete(deleteUser);

module.exports = router;
