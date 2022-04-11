const express = require('express');
const router = express.Router();

// error messages
router.route('*').all((req, res) => {
	res.status(404).send('Content not found.');
});

module.exports = router;
