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
    // console.log(req);

    // parse url
    let parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl.query);
    // console.log(parsedUrl);


    // get http method
    let method = req.method.toLowerCase();
    // console.log(method);

    let headers = req.headers;
    // console.log(headers);

    //get the path
    let pathName = parsedUrl.pathname;


    // get the payload, if any
    let buffer = '';

    req.on('data', chunk => {
        buffer += chunk.toString(); // convert Buffer to string
    });

    req.on('end', function () {


        // check the router if not found use notFound handler
        let chosenHandler = typeof(server.router[pathName]) !== 'undefined' ? server.router[pathName] : handlers.notFound;

        let data = {
            'pathNameFileName': pathName, // pathName and File Name for static assets
            'method': method,
            'payload': parse(buffer)
        };

        // if we have public static choose public handler
        chosenHandler = pathName.indexOf('/public/') > -1 ? handlers.public : chosenHandler;

        chosenHandler(data, function (statusCode, payload, contentType) {

            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            contentType = typeof(contentType) == 'string' ? contentType : 'html';

            let payloadString = '';
            if (contentType == 'html') {
                res.setHeader('Content-Type', 'text/html');
                payloadString = typeof(payload) == 'string' ? payload : '';
            }

            if (contentType == 'favicon') {
                res.setHeader('Content-Type', 'image/x-icon');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'plain') {
                res.setHeader('Content-Type', 'text/plain');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'jpg') {
                res.setHeader('Content-Type', 'image/jpg');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'png') {
                res.setHeader('Content-Type', 'image/png');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
            }

            if (contentType == 'css') {
                res.setHeader('Content-Type', 'text/css');
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
    '/ping': handlers.ping,
    '/': handlers.index,
    '/favicon.png': handlers.favicon,
    '/favicon.ico': handlers.favicon,
    // '/public': handlers.public
    // '/about': 'handlers.about',
    '/resume': handlers.resume,
    '/contact': handlers.contact,
    '/portfolio': handlers.portfolio,
    '/blog': handlers.blog,
    '/test': handlers.test

};

module.exports = server;