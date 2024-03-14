const mongoose = require('mongoose');

// sets up a connection to database
const dbConnection = (host) => mongoose.connect(host);
module.exports = dbConnection;
