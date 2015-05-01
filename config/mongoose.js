/**
 * Created by tom on 3/5/15.
 */

var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    // Register models
    require('../app/models/user.server.model');

    return db;
};