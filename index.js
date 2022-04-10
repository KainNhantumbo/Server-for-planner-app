const express = require('express');
const app = express();
const path = require('path');

// middlewares
app.use(express.json());

// get all contacts
app.get('/api/v1/contacts', (req, res) => {
	res.status(200).json({ name: 'Lara Crawller', number: 782398374 });
});

// save a contact

// update a contact

// delete a contact

// error messages
app.all('*', (req, res) => {
	res.status(404).send('Content not found');
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, console.log('Server on 4500'));
