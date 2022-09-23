class BaseError extends Error {
	constructor(message, status_code) {
		super(message);
		this.message = message;
		this.status_code = status_code;
	}
}

module.exports = BaseError;
