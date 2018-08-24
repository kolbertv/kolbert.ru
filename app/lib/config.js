// Container for all configuration variables
let environments = {};

// development mode
environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',

};

//production mode
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
};


// Determine witch environment was passed as a cli
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Change environment or default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


// export the module
module.exports = environmentToExport;