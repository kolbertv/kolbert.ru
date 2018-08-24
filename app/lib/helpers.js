// dependencies
let path = require('path');
let fs = require('fs');

// containers for all helpers
let helpers = {};


// get the string content of a template
helpers.getTemplate = function (templateName, callback) {

    templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;

    if (templateName) {

        let templatesDir = path.join(__dirname, '/../templates/');
        fs.readFile(templatesDir + templateName + '.html', 'utf8', function (err, str) {

            if (!err && str && str.length > 0) {
                callback(false, str);
            } else {
                callback('No template could be found');
            }
        })

    } else {
        callback('A valid template name was not specified');
    }

};

// take a given string and a data object and find/replace all the keys within it
helpers.interpolation = function() {



};

// export the module
module.exports = helpers;