'use strict';

let path = require('path');
let {readFile} = require('fs');
let {promisify} = require('util');

// let gallery = {};

let gallery = {};


// gallery.readFileProm = (fileName) => {
//     fileName = typeof (fileName) === 'string' && fileName.length > 0 ? fileName : false;
//     if (fileName) {
//         return new Promise((resolve, reject) => {
//             try {
//                 let fullPath = path.join(__dirname, fileName);
//                 fs.readFile(fullPath, 'utf8', (err, data) => {
//                     if (err) reject(err); else resolve(data);
//                 })
//             } catch (err) {
//                 reject(err)
//             }
//         })
//     } else throw ('valid file name was not set');
// };


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


gallery.show = async (fileName, pageName) => {
    fileName = typeof (fileName) === 'string' && fileName.length > 0 ? fileName : false;
    pageName = pageName ? pageName : '/';
    if (fileName) {
        try {
            let readFilePromisify = promisify(readFile);
            let fullPathFileName = path.join(__dirname, fileName);
            let dataFile = await readFilePromisify(fullPathFileName, {encoding: 'utf8'});
            let dataJSONFromFile = JSON.parse(dataFile);
            let dataJSON = [];
            if (pageName === 'all') {
                  for ( let key in dataJSONFromFile) {
                    for (let i=0; i< dataJSONFromFile[key].length; i ++) {
                        dataJSON.push(dataJSONFromFile[key][i])
                    }

                }
            } else {
                dataJSON = JSON.parse(dataFile)[pageName];
            }
            let amountItemWrapper = Math.ceil(dataJSON.length / 3);
            let protfolioContainerItems = '';
            let itemsPos = 0;
            for (let i = 0; i < amountItemWrapper; i++) {
                protfolioContainerItems = protfolioContainerItems + '<div class="portfolio__container__item">';
                for (let j = 0; j < 3; j++) {
                    let template = `<div class="portfolio__item">
                        <img src="/public/img/${dataJSON[itemsPos].img}" alt="">
                        <p>${dataJSON[itemsPos].name}</p>
                        <div class="item__descipt">
                            <p>Дополнительные данные:</p>
                            <p>${dataJSON[itemsPos].unique[0].name}</p>
                            <p>${dataJSON[itemsPos].unique[0].description}</p>
                        </div>
                    </div>`;
                    protfolioContainerItems = protfolioContainerItems + template;
                    itemsPos++;
                    if (itemsPos === dataJSON.length) break;
                }
                protfolioContainerItems = protfolioContainerItems + '</div>';
            }
            return protfolioContainerItems
        } catch (err) {
            return (err)
        }
    } else throw ('valid file name was not set');
};


module.exports = gallery;