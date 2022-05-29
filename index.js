const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const dbConnection = require('./database/connect');
const env = require('dotenv');
const notFoundRoute = require('./middlewares/not-found');
const cors = require('cors');
const authUser = require('./middlewares/auth');

// security
const helmet = require('helmet');
const xssCleaner = require('xss-clean');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});
// environment configuration
env.config();

// middlewares
app.use(limiter);
app.use(helmet());
app.use(xssCleaner());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/v1/contacts', authUser, contactsRoutes);
app.use('/api/v1/tasks', authUser, taskRoutes);
app.use('/api/v1/users', authUser, userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use(notFoundRoute);

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
