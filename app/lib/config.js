// Container for all configuration variables
"use strict";

let environments = {};

// development mode
environments.staging = {
    'httpPort': 2999,
    'httpsPort': 3001,
    'envName': 'staging',

};

//production mode
environments.production = {
    'httpPort': process.env.APP_PORT,
    'httpsPort': process.env.APP_PORT,
    'envName': 'production',
};


// Determine witch environment was passed as a cli
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Change environment or default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


// export the module
module.exports = environmentToExport;