"use strict";

// Dependencies
let http = require('http');
let config = require('./config');
let url = require('url');
let handlers = require('./handlers');
const {parse} = require('querystring');
let StringDecoder = require('string_decoder').StringDecoder;

// Instantiate he server module object
let server = {};

// create http server
server.httpServer = http.createServer(function (req, res) {
    server.unifiedServer(req, res);
});

// common server for http and future https
server.unifiedServer = function (req, res) {
    // console.log(req.headers['user-agent']);

    // parse url
    let parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl.query);
    // console.log(parsedUrl);


    // get http method
    let method = req.method.toLowerCase();

    let headers = req.headers;

    //get the path
    let pathName = parsedUrl.pathname;
    // console.log(pathName);
    let urlArray = parsedUrl.pathname.match(/(\w+)/g);

    let pageName = '';
    let pageName1 = '';
    // console.log('содержимое массива '+urlArray);
    if (urlArray !== null) {
        pageName = urlArray[0];
        if (urlArray[1] !== undefined){
            pageName1 = urlArray[1];
        } else {
            pageName1 = null;
        }
    } else {
        pageName = pathName.replace('/', '');
    }

    // get the payload, if any
    let buffer = '';

    req.on('data', chunk => {
        buffer += chunk.toString(); // convert Buffer to string
    });

    req.on('end', function () {


        // check the router if not found use notFound handler
        let chosenHandler = typeof(server.router[pageName]) !== 'undefined' ? server.router[pageName] : handlers.notFound;

        // if we have public static choose public handler
        chosenHandler = pathName.indexOf('/public/') > -1 ? handlers.public : chosenHandler;

        let data = {
            'pageName': pageName, // page name for routing
            'pageName1': pageName1,
            'pathNameFileName': pathName, // pathName and File Name for static assets
            'method': method,
            'payload': parse(buffer)
        };

        chosenHandler(data, function (statusCode, payload, contentType) {
            // console.log(statusCode);
            // console.log(payload);
            // console.log(contentType);

            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            contentType = typeof(contentType) == 'string' ? contentType : 'html';

            let payloadString = '';
            if (contentType == 'html') {
                res.setHeader('Content-Type', 'text/html');
                payloadString = typeof(payload) == 'string' ? payload : '';
            }

            if (contentType == 'favicon') {
                res.setHeader('Content-Type', 'image/x-icon');
                res.setHeader('Cache-Control', 'max-age=86400');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'plain') {
                res.setHeader('Content-Type', 'text/plain');
                res.setHeader('Cache-Control', 'private, max-age=86400');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'jpg') {
                res.setHeader('Content-Type', 'image/jpg');
                res.setHeader('Cache-Control', 'max-age=86400');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'png') {
                res.setHeader('Content-Type', 'image/png');
                res.setHeader('Cache-Control', 'max-age=86400');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'css') {
                res.setHeader('Content-Type', 'text/css');
                res.setHeader('Cache-Control', 'max-age=86400');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            res.writeHead(statusCode);
            res.end(payloadString);
        });

    });

};


// Server init script
server.init = function () {
    server.httpServer.listen(config.httpPort, function () {
        console.log('The HTTP server is runnig on port: ' + config.httpPort);
    })
};


// define the request router
server.router = {
    'ping': handlers.ping,
    '': handlers.index,
    'favicon.png': handlers.favicon,
    'favicon.ico': handlers.favicon,
    // '/public': handlers.public
    // '/about': 'handlers.about',
    'resume': handlers.resume,
    'contact': handlers.contact,
    'portfolio': handlers.portfolio,
    'blog': handlers.blog,
    'test': handlers.test

};

module.exports = server;