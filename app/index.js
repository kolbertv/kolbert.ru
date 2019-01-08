//Dependencies
"use strict";

let server = require('./lib/server');

// Declare app
let app = {};

// start server
app.init = () => server.init()

// self init
app.init();

// module for export the app

module.exports = app;