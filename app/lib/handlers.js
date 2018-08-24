
let helpers = require('./helpers');

let handlers = {};

handlers.index = function (callback) {

    helpers.getTemplate('index', function (err, str) {
       if (!err && str) {
           callback(200, str);
       } else {
           callback(500, undefined);
       }

    });
};

handlers.ping = function (callback) {
    callback(200, 'status 200');
};

handlers.notFound = function (callback) {
    callback(404, 'Error, page not found');
};

module.exports = handlers;