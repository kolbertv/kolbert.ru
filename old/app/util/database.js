const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('../lib/config');

let _db;

const mongoConnect = cb => {

    const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zrs2t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;

    MongoClient.connect(MONGODB_URI, {
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