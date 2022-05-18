const jwt = require('jsonwebtoken');
const env = require('dotenv');
const User = require('../models/User-model');
const bcrypt = require('bcrypt');

// environment config
env.config();

// function that creates tokens
const tokenCreator = (user) =>
	new Promise((resolve) => {
		const token = jwt.sign(
			{
				user_id: user._id,
				user_name: `${user.name} ${user.surname}`,
			},
			process.env.SECRET_TOKEN,
			{ expiresIn: process.env.JWT_LIFETIME }
		);

		resolve(token);
	});

// login middleware function
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// checks if is there a password and email
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Email and password must be provided' });
		}

		// gets the user
		const user = await User.findOne({ email });

		// verify if that user exists in the database
		// if not, throws an error
		if (!user) {
			return res
				.status(404)
				.json({ message: 'User with provided email not found.' });
		}

		// compares the password
		const match = await bcrypt.compare(password, user.password);

		// checks if password matchs, otherwise throws
		// an error
		if (!match) {
			return res.status(401).json({ message: 'Wrong password.' });
		}

		// generates a jwt token
		const token = await tokenCreator(user);

		// as response, sends a user id, user name and access token
		res.status(200).json({
			user_id: user._id,
			user_name: `${user.name} ${user.surname}`,
			token,
		});
	} catch (err) {
		res.status(500).json({ err });
	}
};

// register users controller
const register = async (req, res) => {
	try {
		const credentials = req.body;
		// creates a new user in database
		const user = await User.create({ ...credentials });

		// generates a jwt token
		const token = await tokenCreator(user);

		// as response, sends a user id, user name and access token
		res.status(201).json({
			user_id: user._id,
			user_name: `${user.name} ${user.surname}`,
			token,
		});
	} catch (err) {
		res.status(500).json({ err });
	}
};

module.exports = { login, register };
