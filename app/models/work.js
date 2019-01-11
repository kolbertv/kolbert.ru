const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'works.json'
);

const getWorksFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}


module.exports = class Work {
    constructor(title, descript, feature, url, year) {
        this.title = title;
        this.descript = descript;
        this.feature = feature;
        this.url = url;
        this.year = year;
    }

    save() {
        getWorksFromFile(works => {
            works.push(this)
            fs.writeFile(p, JSON.stringify(works), (err) => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        getWorksFromFile(cb)
    }
}