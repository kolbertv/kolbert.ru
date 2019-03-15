// Container for all configuration variables
"use strict";

const auth = require('../config/configOAuth');

let environments = {};

// development mode
environments.staging = {
    'httpPort': 2999,
    'httpsPort': 3001,
    'envName': 'staging',
    'mongopass': auth.dev.mongopass,
    'mongouser': auth.dev.mongouser,
    'mongoDB': auth.dev.mongoDB

};

//production mode
environments.production = {
    'httpPort': process.env.APP_PORT,
    'httpsPort': process.env.APP_PORT,
    'envName': 'production',
    'mongopass': process.env.MONGO_PASSWORD,
    'mongouser': process.env.MONGO_USER,
    'mongoDB': process.env.MONGO_DB
};


// Determine witch environment was passed as a cli
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Change environment or default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


// export the module
module.exports = environmentToExport;