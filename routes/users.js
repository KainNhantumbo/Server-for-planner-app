const express = require('express');
const router = express.Router();
const { getUserData, deleteUser } = require('../controllers/users-controller');
const User = require('../models/User-model')

// route to get user data
router.route('/').get(getUserData).delete(deleteUser);

module.exports = router;
