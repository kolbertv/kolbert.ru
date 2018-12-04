// dependencies
"use strict";

let path = require('path');
let fs = require('fs');

// containers for all helpers
let helpers = {};

helpers.showTemplate = function (data, callback) {


};


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

helpers.addUniversalTemplate = function (str, callback) {
    str = typeof(str) == 'string' && str.length > 0 ? str : '';

    // get header
    helpers.getTemplate('_header', function (err, headerString) {
        if (!err && headerString) {

            // get footer
            helpers.getTemplate('_footer', function (err, footerString) {
                if (!err && footerString) {
                    let fullString = headerString + str + footerString;
                    callback(false, fullString);

                } else {
                    callback('Could not find the footer template')
                }

            })

        } else {
            callback('Could not find the header template')
        }
    })

};

// get static assets. fileName have and path and file name like /img/logo.png
helpers.getStaticAsset = function (fileName, callback) {
    fileName = typeof (fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if (fileName) {
        let publicDir = path.join(__dirname, '/../public');
        fs.readFile(publicDir + fileName, function (err, data) {
            if (!err && data) {
                callback(false, data);
            } else {
                callback('No file could be found');
            }
        })
    } else {
        callback('A valid file name was not specified');
    }

};

//set style file to page

helpers.setStyle = function (str, styleFileName) {

    styleFileName = typeof(styleFileName) == 'string' && styleFileName.length > 0 ? styleFileName : false;
    str = typeof(str) == 'string' && str.length > 0 ? str : false;

    if (styleFileName && str) {
                let replace = '<link rel="stylesheet" href="../public/style/' + styleFileName + '.css">';
                let find = '{stylesheet.fileName}';
                str = str.replace(find, replace);
        }

     if (!styleFileName) {
         str = str.replace('{stylesheet.fileName}', '');
     }

    return str;
};


// take a given string and a data object and find/replace all the keys within it
helpers.interpolation = function (str, data) {

    str = typeof(str) == 'string' && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};

    // add the globals data

    for (let keyName in config.templateGlobals) {
        if (config.templateGlobals.hasOwnProperty(keyName)) {
            data['global.' + keyName] = config.templateGlobals[keyName];
        }
    }

    for (let key in data) {
        if (data.hasOwnProperty(key) && typeof(data[key]) == 'string') {
            let replace = data[key];
            let find = '{' + key + '}';
            str = str.replace(find, replace);
        }
    }

    return str;

};

helpers.readData = function(fileName, callback) {
    fileName = typeof (fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if (fileName) {
        let publicDir = path.join(__dirname, '/../data/');
        fs.readFile(publicDir+fileName, 'utf8', (err, data)=> {
            if (!err && data) {
                let dataJSON = JSON.parse(data);
                callback(false, dataJSON);
            } else {
                callback('File not found');
            }
        });
    } else {
        callback('A valid file name was not specified')
    }

};

// export the module
module.exports = helpers;