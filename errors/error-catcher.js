/**
 * Wrapper function for global error handling.
 * @param fn asynchronous function to be wrapped and error handled.
 * @returns Promise<...>
 */
const asyncWrapper = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncWrapper;
