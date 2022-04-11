const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');
const dbConnection = require('./database/connect');
const env = require('dotenv');

// environment configuration
env.config();

// middlewares
app.use(express.json());

// contact routes
app.use('/api/v1/contacts', contactsRoutes);

// error messages
app.all('*', (req, res) => {
	res.status(404).send('Content not found');
});

// app port
const PORT = process.env.PORT || 4500;

// makes sure that the app starts after connecting to database
const serverStart = async (PORT) => {
	try {
		await dbConnection(process.env.MONGO_URI);
		app.listen(PORT, console.log('Server on 4500'));
	} catch (error) {
		console.log(error);
	}
};

// starts the server
serverStart(PORT);
