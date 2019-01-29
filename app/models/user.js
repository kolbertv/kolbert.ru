const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;

const getDb = require('../util/database').getDb;


class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
        this.createdAt = new Date();

    }

    save() {
        const db = getDb();

        return db.collection('users').insertOne(this);
    }

    static findUserById(userId) {
        const db = getDb();
        return db.collection('users')
            .findOne({
                _id: new ObjectId(userId)
            })
            .then(user => user)
            .catch(err => console.log(err));
    }
}





module.exports = User;