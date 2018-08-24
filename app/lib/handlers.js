// dependencies
let helpers = require('./helpers');


// container for all handlers
let handlers = {};


// index handler
handlers.index = function (callback) {

    helpers.getTemplate('index', function (err, str) {
        if (!err && str) {

            helpers.addUniversalTemplate(str, function (err, str) {
                if (!err && str) {
                    callback(200, str);
                } else {
                    callback(500, undefined);
                }

            })

        } else {
            callback(500, undefined);
        }

    });
};


// favicon handler
handlers.faviconPNG = function (callback) {
    helpers.getStaticAsset('favicon.png', function (err, data) {
        if (!err && data) {
            callback(200, data, 'favicon');
        } else {
            callback(500);
        }
    })
};

handlers.faviconICO = function (callback) {
    helpers.getStaticAsset('favicon.ico', function (err, data) {
        if (!err && data) {
            callback(200, data, 'favicon');
        } else {
            callback(500);
        }
    })
};

// public handlers

handlers.public = function(callback){

    callback(200);

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