const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect('mongodb://goweek:goweekx123@ds123625.mlab.com:23625/goweek-twitter-clone', {useNewUrlParser: true});

module.exports = db;