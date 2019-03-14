const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('../lib/config');

let _db;

const mongoConnect = cb => {

    MongoClient.connect(`mongodb+srv://${config.mongouser}:${config.mongopass}@cluster0-zrs2t.mongodb.net/${config.mongoDB}?retryWrites=true`, {
            useNewUrlParser: true
        })
        .then(client => {
            console.log('mongodb connected');
            _db = client.db();
            cb();
        })
        .catch(err => console.log(err));
};

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No database found!';

};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;