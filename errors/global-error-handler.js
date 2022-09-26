const errorHandler = require('./error-handler');
const BaseError = require('./base-error');
const JsonWebTokenError = require('jsonwebtoken').JsonWebTokenError;
const TokenExpiredError = require('jsonwebtoken').TokenExpiredError;

const globalErrorHandler = (err, req, res, next) => {
	if (err instanceof BaseError) return errorHandler(err, res);

	if (err instanceof JsonWebTokenError)
		return res.status(403).json({ message: 'Invalid Token', err_code: 403 });

	if (err instanceof TokenExpiredError)
		return res.status(403).json({ message: 'Expired Token', err_code: 403 });

	return res.status(500).json({
		message: 'Internal Server Error',
		err_code: 500,
	});
};

module.exports = globalErrorHandler;
