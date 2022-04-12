const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');
const dbConnection = require('./database/connect');
const env = require('dotenv');
const notFoundRoute = require('./middlewares/not-found');
const cors = require('cors');

// environment configuration
env.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/contacts', contactsRoutes);
app.use(notFoundRoute);

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
