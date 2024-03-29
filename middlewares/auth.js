const jwt = require('jsonwebtoken');
const env = require('dotenv');
const BaseError = require('../errors/base-error');
const asyncWrapper = require('../errors/error-catcher');

// environment config
env.config();

// a asynchronous function to verify integrity of the token
const verifyToken = (token, secret) =>
	new Promise((resolve) => {
		const result = jwt.verify(token, secret);
		resolve(result);
	});

// middleware function that verifies user authentication authority
const authUser = asyncWrapper(async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer '))
		throw new BaseError('Invalid authentication', 401);

	const token = authHeader.split(' ')[1];
	const payload = await verifyToken(token, process.env.SECRET_TOKEN);
	// populates the request object with user data
	req.user = { user_id: payload.user_id };
	next();
});

module.exports = authUser;
