// Dependencies
let http = require('http');
let config = require('./config');
let url = require('url');
let handlers = require('./handlers');

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
    let pathName = parsedUrl.pathname;

    // check the router if not found use notFound handler
    let chosenHandler = typeof(server.router[pathName]) !== 'undefined' ? server.router[pathName] : handlers.notFound;

    chosenHandler(function (statusCode, payload) {

        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
        payload = typeof(payload) == 'string' ? payload : '';

        res.setHeader('Content-Type', 'text/html');
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


// define the request router
server.router = {
    '/ping': handlers.ping,
    '/': handlers.index
    // '/about': 'handlers.about',
    // '/resume': 'handlers.resume'
};

module.exports = server;