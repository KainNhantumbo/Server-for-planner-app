const jwt = require('jsonwebtoken');
const env = require('dotenv');
const User = require('../models/User-model');
const bcrypt = require('bcrypt');
const BaseError = require('../errors/base-error');

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
	const { email, password } = req.body;
	if (!email || !password)
		throw new BaseError('Email and password must be provided', 400);

	const user = await User.findOne({ email });
	if (!user) throw new BaseError('Invalid credentials', 401);

	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new BaseError('Wrong password', 401);

	const token = await tokenCreator(user);
	res.status(200).json({
		user_name: `${user.name} ${user.surname}`,
		token,
	});
};

// register users controller
const register = async (req, res) => {
	const credentials = req.body;
	const user = await User.create({ ...credentials });
	const token = await tokenCreator(user);
	res.status(201).json({
		user_name: `${user.name} ${user.surname}`,
		token,
	});
};

module.exports = { login, register };
