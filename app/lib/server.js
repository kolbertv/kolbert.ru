// Dependencies
let http = require('http');
let config = require('./config');
let url = require('url');

// Instantiate he server module object
let server = {};


// create http server
server.httpServer = http.createServer(function (req, res) {
    server.unifiedServer(req, res);
});


// common server for http and future https
server.unifiedServer = function (req, res) {

    // parse url
    let parsedUrl = url.parse(req.url, true);

    //get the path
    let path = parsedUrl.pathname;

    // check the router if not found use notFound handler
    let chosenHandler = typeof(server.router[path]) !== 'undefined' ? server.router[path] : handlers.notFound;

    chosenHandler(function (statusCode, payload) {

        statusCode = typeof(statusCode) =='number' ? statusCode: 200;
        payload = typeof(payload) == 'string' ? payload : 'Hello World!\n';

        res.writeHead(statusCode);
        res.end(payload);

    });


};


// Server init script
server.init = function () {
    server.httpServer.listen(config.httpPort, function () {
        console.log('The HTTP server is runnig on port: ' + config.httpPort);
    })
};


let handlers = {};

handlers.ping = function (callback) {
    callback(200);
};

handlers.notFound = function (callback) {
    callback(404, 'Error, page not found');
};

// define the request router
server.router = {
    '/ping': handlers.ping
    // '/': 'handlers.index',
    // '/about': 'handlers.about',
    // '/resume': 'handlers.resume'
};

module.exports = server;