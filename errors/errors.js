class ErrorHandler extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
		console.log(message, this.code);
	}
}
module.exports = ErrorHandler;
