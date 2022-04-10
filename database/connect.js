const mongoose = require('mongoose');
const host = 'mongodb://localhost:27017/planner';

// sets up a connection to database
const dbConnection = (host) => mongoose.connect(host);

module.exports = dbConnection(host);
