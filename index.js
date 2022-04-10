const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');
const dbConnection = require('./database/connect');
// middlewares
app.use(express.json());

// contact routes
app.use('/api/v1/contacts', contactsRoutes);

// error messages
app.all('*', (req, res) => {
	res.status(404).send('Content not found');
});

const PORT = process.env.PORT || 4500;

const start = async (PORT) => {
	try {
		await dbConnection;
		app.listen(PORT, console.log('Server on 4500'));
	} catch (error) {
		console.log(error);
	}
};

start()