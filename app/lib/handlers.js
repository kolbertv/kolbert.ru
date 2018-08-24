// dependencies
let helpers = require('./helpers');


// container for all handlers
let handlers = {};


// index handler
handlers.index = function (callback) {

    helpers.getTemplate('index', function (err, str) {
        if (!err && str) {
            callback(200, str);
        } else {
            callback(500, undefined);
        }

    });
};


// ping handler
handlers.ping = function (callback) {
    callback(200, 'status 200');
};


// not found handler
handlers.notFound = function (callback) {
    callback(404, 'Error, page not found');
};

// export the module
module.exports = handlers;