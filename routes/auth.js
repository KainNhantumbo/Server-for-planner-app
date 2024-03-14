const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth-controller');
const asyncWrapper = require('../errors/error-catcher');

router.post('/register', asyncWrapper(register));
router.post('/login', asyncWrapper(login));

module.exports = router;
