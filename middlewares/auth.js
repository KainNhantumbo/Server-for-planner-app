const jwt = require('jsonwebtoken');
const env = require('dotenv');

// environment config
env.config();

// a asynchronous function to verify integrity of the token
const verifyToken = (token, secret) =>
	new Promise((resolve) => {
		const result = jwt.verify(token, secret);
		resolve(result);
	});

// function that  verifies that user access
const authUser = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'Invalid authentication.' });
		}
		// extracts the token from authHeader string
		const token = authHeader.split(' ')[1];
		// verifies the integrity of the token
		// if compromised, throws an error
		const payload = await verifyToken(token, process.env.SECRET_TOKEN);
		// populates the request object with user data
		req.user = { user_id: payload.user_id };
		// if its all OK, the next function is called
		next();
	} catch (err) {
		res.status(500).json({ err });
	}
};

module.exports = authUser;
