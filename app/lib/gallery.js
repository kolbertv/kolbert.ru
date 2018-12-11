'use strict';

let path = require('path');
let fs = require('fs');
let {readFile} = require('fs');
let {promisify} = require('util');

// let gallery = {};

let gallery = {
    // func() {},
    // promise() {},
    // readFileProm() {},
    // async readFileAsync() {}
};

function readData(options, callback) {
    options = typeof(options) == "object" && options !== null ? options : {};
    if (options) {
        let publicDir = path.join(__dirname, '/../data');
        fs.readFile(publicDir + options.fileName, 'utf8', (err, loadData) => {
            if (!err && loadData) {
                let json = JSON.stringify(loadData);
                callback(false, json)
            } else {
                callback('File not found')
            }
        })
    } else {
        callback('valid file name or other options not specified')
    }
}

let optionsDeafult = {
    amount: 3,
    amountPerPage: 10,
    str: '',
    fileName: 'data.json'
};

gallery.func = function (data, callback) {
    data = typeof (data) === 'object' ? data : false;
    if (data) {

        let publicDir = path.join(__dirname, '/../data');

        let options = Object.assign(optionsDeafult, data);
        callback(optionsDeafult);

    } else {
        callback('Options was not set properly');

    }

};

gallery.promise = (data) => {
    const promise = new Promise((resolve, reject) => {
        data = typeof (data) === 'object' ? data : {};
        if (data) {
            let options = Object.assign(optionsDeafult, data);
            console.log(options);
            let publicDir = path.join(__dirname, '/../data');
            try {
                fs.readFile(publicDir + options.fileName, 'utf8', (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            } catch (e) {
                reject(e)

            }

        }
    });
    return promise;
};

gallery.readFileProm = (fileName) => {
    fileName = typeof (fileName) === 'string' && fileName.length > 0 ? fileName : false;
    if (fileName) {
        return new Promise((resolve, reject) => {
            try {
                let fullPath = path.join(__dirname, fileName);
                fs.readFile(fullPath, 'utf8', (err, data) => {
                    if (err) reject(err); else resolve(data);
                })
            } catch (err) {
                reject(err)
            }
        })
    } else throw ('file was not set');
};


gallery.readFileAsync = async (fileName) => {
    fileName = typeof (fileName) === 'string' && fileName.length > 0 ? fileName : false;
    if (fileName) {
        try {
            let readFilePromisify = promisify(readFile);
            let fullPathFileName = path.join(__dirname, fileName);
            return await readFilePromisify(fullPathFileName, {encoding: 'utf8'});
        } catch (err) {
            return (err)
        }
    } else throw ('valid file name was not set');
};

gallery.createTemplate = async (data, template) => {

};



// gallery = async (str, year) => {
//     str = typeof (str) === 'string' && str.length > 0 ? str : '';
//     year = typeof (year) === 'string' && year.length > 0 ? year : '';
//
//     if (str.length > 0 && year.length > 0) {
//         // при условии чть есть данные и задан год
//
//
//
//         return 'при условии чть есть данные и задан год'
//     } else if (str.length > 0 && year === '') {
//         // есть данные, но год не задан для страницы с примерами
//
//         return 'есть данные, но год не задан для страницы с примерами'
//     } else {
//         // нет нужных входных параметров
//         return 'нет входных данных для отображения галереи'
//     }
//
// };


module.exports = gallery;