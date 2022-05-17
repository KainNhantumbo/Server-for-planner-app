const express = require('express');
const router = express.Router();

// error messages
router.route('*').all((req, res) => {
	res.status(404).send(`<h1>Error 404</h1></br><h3>Content not found.</h3>`);
});

module.exports = router;
