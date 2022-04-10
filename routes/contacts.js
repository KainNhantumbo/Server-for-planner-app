const express = require('express');
const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		res.status(200).json({ name: 'Lara Crawller', number: 782398374 });
	})

module.exports = router;
