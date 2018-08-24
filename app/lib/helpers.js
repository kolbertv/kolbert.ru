let path = require('path');
let fs = require('fs');


let helpers = {};

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


module.exports = helpers;