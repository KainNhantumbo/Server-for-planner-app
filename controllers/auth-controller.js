const jwt = require('jsonwebtoken');
const env = require('dotenv');
const User = require('../models/User-model');

// environment config
env.config();

// login middleware function
const login = async (req, res) => {
	try {
		res.send('login hited');
	} catch (err) {
		res.status(500).json({ err });
	}
};

// login middleware function
const register = async (req, res) => {
	try {
		const credentials = req.body;
    const data = await User.create({...credentials})
		res.status(201).json({data})
	} catch (err) {
		res.status(500).json({ err });
	}
};

module.exports = { login, register };
