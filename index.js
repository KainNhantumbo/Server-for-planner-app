const express = require('express');
const app = express();
const contactsRoutes = require('./routes/contacts');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const env = require('dotenv');
const notFoundRoute = require('./middlewares/not-found');
const dbConnection = require('./database/connect');
const cors = require('cors');
const authUser = require('./middlewares/auth');
const globalErrorHandler = require('./errors/global-error-handler');

// security
const helmet = require('helmet');
const xssCleaner = require('xss-clean');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1200,
	standardHeaders: true,
	legacyHeaders: false,
});
// environment configuration
env.config();

// middlewares
app.use(limiter);
app.use(helmet());
app.use(xssCleaner());
app.use(cors());
app.use(express.json());
app.use('/api/v1/contacts', authUser, contactsRoutes);
app.use('/api/v1/tasks', authUser, taskRoutes);
app.use('/api/v1/users', authUser, userRoutes);
app.use('/api/v1/auth', authRoutes);

// error handling
app.use(notFoundRoute);
app.use(globalErrorHandler);

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
