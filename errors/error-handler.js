/**
 * Error handler function to handle global known errors.
 * @param err error object containing message and status code.
 * @returns Express Response
 */
const errorHandler = (err, res) => {
	const { message, status_code } = err;
	res.status(status_code).json({
		message,
		err_code: status_code,
	});
};

module.exports = errorHandler;
