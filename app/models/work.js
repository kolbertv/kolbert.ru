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
    constructor(id, title, descript, feature, url, year) {
        this.id = id;
        this.title = title;
        this.descript = descript;
        this.feature = feature;
        this.url = url;
        this.year = year;
    }

    save() {
        getWorksFromFile(works => {

            if (this.id) {
                const existWorkIndex = works.findIndex(work => work.id === this.id)
                const updatedWorks = [...works]
                updatedWorks[existWorkIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedWorks), (err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString();
                works.push(this)
                fs.writeFile(p, JSON.stringify(works), (err) => {
                    console.log(err)
                })
            }
        })
    }

    static fetchAll(cb) {
        getWorksFromFile(cb)
    }

    static findById(id, cb) {
        getWorksFromFile(works => {
            const work = works.find(p => p.id === id)
            cb(work)
        })
    }

    static deleteById(id) {
        getWorksFromFile(works => {
            const updatedWorks = works.filter(work => work.id !== id)
            fs.writeFile(p, JSON.stringify(updatedWorks), err => {
                console.log(err)
            })

        })

    }
}