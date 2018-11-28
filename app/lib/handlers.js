// dependencies
"use strict";

let helpers = require('./helpers');
let nodemailer = require('nodemailer');
let xoauth2 = require('xoauth2');
let auth = require('../config/configOAuth');
let {performance} = require('perf_hooks');

// container for all handlers
let handlers = {};

// index handler
handlers.index = function (data, callback) {
    // console.log(data);
    helpers.getTemplate('index', function (err, str) {
        if (!err && str) {
            helpers.addUniversalTemplate(str, function (err, str) {
                if (!err && str) {

                    let finalString = helpers.setStyle(str, '');
                    callback(200, finalString);
                } else {
                    callback(500, undefined);
                }
            })
        } else {
            callback(500, undefined);
        }
    });
};

// resume handler
handlers.resume = function (data, callback) {
    helpers.getTemplate(data.pageName, function (err, str) {
        if (!err && str) {
            helpers.addUniversalTemplate(str, function (err, str) {
                if (!err && str) {

                    let finalString = helpers.setStyle(str, data.pageName);
                    callback(200, finalString)
                } else {
                    callback(500, undefined)
                }
            })
        } else {
            callback(500, undefined)
        }
    })
};

// resume contacts
handlers.contact = function (data, callback) {


    if (data.method == 'post') {
        let transport = nodemailer.createTransport({
            service: auth.dev.service,
            // secure: false,
            auth: {
                user: auth.dev.id,
                pass: auth.dev.token
            }
        });

        let fromFull = data.payload.lname + ' ' + data.payload.fname + ' ' + data.payload.email;
        let textFull = data.payload. textarea + '. Сылка на облако:' + data.payload.url + ' Телефон для связи: ' + data.payload.phone;
        transport.sendMail({
            // from: auth.dev.id,
            from: fromFull,
            to: auth.dev.user,
            envelope: {
                from: auth.dev.id,
                to: auth.dev.user,
            },
            subject: data.payload.title,
            text: textFull,
        });
    }


    helpers.getTemplate(data.pageName, function (err, str) {
        if (!err && str) {
            helpers.addUniversalTemplate(str, function (err, str) {
                if (!err && str) {
                    let finalString = helpers.setStyle(str, data.pageName);
                    callback(200, finalString);
                } else {
                    callback(500, undefined)
                }
            })
        } else {
            callback(500, undefined)
        }
    })
};

// portfolio
handlers.portfolio = function (data, callback) {
    helpers.getTemplate(data.pageName, function (err, str) {
        if (!err && str) {
            helpers.addUniversalTemplate(str, function (err, str) {
                if (!err && str) {
                    let finalString = helpers.setStyle(str, data.pageName);
                    callback(200, finalString);
                } else {
                    callback(500, undefined)
                }
            })
        } else {
            callback(500, undefined)
        }
    })
};

// blog
handlers.blog = function (data, callback) {
    helpers.getTemplate(data.pageName, function (err, str) {
        if (!err && str) {
            helpers.addUniversalTemplate(str, function (err, str) {
                if (!err && str) {
                    let finalString = helpers.setStyle(str, data.pageName);
                    callback(200, finalString);
                } else {
                    callback(500, undefined)
                }
            })
        } else {
            callback(500, undefined)
        }
    })
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


// test handler
handlers.test = function (data, callback) {
    helpers.getTemplate(data.pageName, function (err, str) {
        console.log(data);
        // console.log(str);
        if (!err && str) {
            callback(200, str);
        } else {
            callback(500);
        }
    });
};


// not found handler
handlers.notFound = function (data, callback) {
    callback(404, 'Error, page not found');
};

// export the module
module.exports = handlers;