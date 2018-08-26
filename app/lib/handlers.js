// dependencies
let helpers = require('./helpers');

// container for all handlers
let handlers = {};

// index handler
handlers.index = function (data, callback) {
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
handlers.favicon = function (data, callback) {
    helpers.getStaticAsset(data.pathNameFileName, function (err, data) {
        if (!err && data) {
            callback(200, data, 'favicon');
        } else {
            callback(500);
        }
    })
};

// public handlers
handlers.public = function (data, callback) {
    let trimmedPath = data.pathNameFileName.replace('/public', '').trim();
    if (trimmedPath.length > 0) {
        helpers.getStaticAsset(trimmedPath, function (err, data) {
            if (!err && data) {
                let contentType = 'plain';
                if (trimmedPath.indexOf('.css') > -1) {
                    contentType = 'css';
                }
                if (trimmedPath.indexOf('.jpg') > -1) {
                    contentType = 'jpg';
                }
                if (trimmedPath.indexOf('.png') > -1) {
                    contentType = 'png';
                }
                callback(200, data, contentType);
            } else {
                callback(404);
            }
        })
    } else {
        callback(404)
    }
};

// ping handler
handlers.ping = function (data, callback) {
    callback(200, 'status 200');
};

// not found handler
handlers.notFound = function (data, callback) {
    callback(404, 'Error, page not found');
};

// export the module
module.exports = handlers;