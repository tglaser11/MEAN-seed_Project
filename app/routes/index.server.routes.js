/**
 * Created by tom on 2/22/15.
 */

module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render)
};