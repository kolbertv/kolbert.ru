//Dependencies
"use strict";

let server = require('./lib/server');

// Declare app
let app = {};


// init function
app.init = function () {

    // start server
    server.init();
};

// self init
app.init();



// module for export the app
module.exports = app;