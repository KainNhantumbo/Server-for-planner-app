const jwt = require('jsonwebtoken');
const env = require('dotenv');
const User = require('../models/User-model');
const bcrypt = require('bcrypt');

// environment config
env.config();

// asyncronous function that creates tokens
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

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Email and password must be provided' });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).json({ message: 'Wrong password.' });
		}
		const token = await tokenCreator(user);
		res.status(200).json({
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
		const user = await User.create({ ...credentials });
		const token = await tokenCreator(user);
		res.status(201).json({
			user_name: `${user.name} ${user.surname}`,
			token,
		});
	} catch (err) {
		res.status(500).json({ err });
	}
};

module.exports = { login, register };
