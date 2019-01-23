// const fs = require('fs')
// const path = require('path')

const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Work {
    constructor(id, title, descript, feature, url, year) {
        this.title = title;
        this.descript = descript;
        this.feature = feature;
        this.url = url;
        this.year = year;

        console.log(new mongodb.ObjectID(id))

        if (id) {
            this._id = new mongodb.ObjectID(id);
        }

    }

    save() {
        const db = getDb();

        let dbOp;

        if (this._id) {
            //update the works
            console.log(this._id)
            dbOp = db.collection('works').updateOne({
                _id: this._id
            }, {
                $set: this
            })

        } else {
            // add new work
            dbOp = db.collection('works').insertOne(this)
        }

        return dbOp
            // .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('works')
            .find()
            .toArray()
            .then(works => {
                // console.log(works);
                return works;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(workId) {
        const db = getDb();
        return db.collection('works')
            .find({
                _id: new mongodb.ObjectID(workId)
            })
            .next()
            .then(work => {
                // console.log(work);
                return work;
            })
            .catch(err => {
                console.log(err);
            });

    }

    static deleteById(workId) {
        const db = getDb();
        return db
            .collection('works')
            .deleteOne({
                _id: new mongodb.ObjectID(workId)
            })
            .catch(err => {
                console.log(err);
            });

    }
}


// const p = path.join(path.dirname(process.mainModule.filename),
//     'data',
//     'works.json'
// );

// const getWorksFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([])
//         } else {
//             cb(JSON.parse(fileContent))
//         }
//     })
// }


// module.exports = class Work {
//     constructor(id, title, descript, feature, url, year) {
//         this.id = id;
//         this.title = title;
//         this.descript = descript;
//         this.feature = feature;
//         this.url = url;
//         this.year = year;
//     }

//     save() {
//         getWorksFromFile(works => {

//             if (this.id) {
//                 const existWorkIndex = works.findIndex(work => work.id === this.id)
//                 const updatedWorks = [...works]
//                 updatedWorks[existWorkIndex] = this;
//                 fs.writeFile(p, JSON.stringify(updatedWorks), (err) => {
//                     console.log(err)
//                 })
//             } else {
//                 this.id = Math.random().toString();
//                 works.push(this)
//                 fs.writeFile(p, JSON.stringify(works), (err) => {
//                     console.log(err)
//                 })
//             }
//         })
//     }

//     static fetchAll(cb) {
//         getWorksFromFile(cb)
//     }

//     static findById(id, cb) {
//         getWorksFromFile(works => {
//             const work = works.find(p => p.id === id)
//             cb(work)
//         })
//     }

//     static deleteById(id) {
//         getWorksFromFile(works => {
//             const updatedWorks = works.filter(work => work.id !== id)
//             fs.writeFile(p, JSON.stringify(updatedWorks), err => {
//                 console.log(err)
//             })

//         })

//     }
// }

module.exports = Work;