const express = require('express');
const router = express.Router();
const getUserData = require('../controllers/users-controller');

// route to get user data
router.get('/', getUserData);

module.exports = router;
