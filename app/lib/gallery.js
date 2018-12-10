'use strict';

let path = require('path');
let fs = require('fs');

let options = {
    fileName: 'data.json'
};

function readData(options, callback) {
    options = typeof(options) == "object" && options !== null ? options : {}
    if (options) {
        let publicDir = path.join(__dirname, '/../data')
        fs.readFile(publicDir + options.fileName, 'utf8', (err, loadData) => {
            if (!err && loadData) {
                let json = JSON.stringify(loadData)
                callback(false, json)
            } else {
                callback('File not found')
            }
        })
    } else {
        callback ('valid file name or other options not specified')
    }
}


module.exports = class Gallery {

    constructor(options = null) {

        if (typeof(options) == "object" && options !== null) {
            this.year = options.year
            this.amount = options.amount
        } else {

            this.year = null
            this.amount = null
        }

    }


    show() {
        return `типа тут должна быть галерея год ${this.year} и количество картинок ${this.amount}`
    }

};