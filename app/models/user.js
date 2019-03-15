const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;

const getDb = require("../util/database").getDb;

class User {
  constructor(data) {
    this._id = data._id ? new mongodb.ObjectID(data._id) : null;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.resetToken = data.resetToken;
    this.resetTokenExpiration = data.resetTokenExpiration;

  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      this.updatedAt = new Date();
      dbOp = db.collection('users').updateOne({
        _id: this._id
      }, {
        $set: this
      })
    } else {
      this.createdAt = new Date();
      dbOp = db.collection("users").insertOne(this);
    }

    return dbOp.catch(err => console.log(err));
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({
      _id: new ObjectId(userId)
    });

  }

  static findOne(data) {
    const db = getDb();
    // data._id = new ObjectId(data._id);
    return db.collection("users").findOne(data);
  }
}

module.exports = User;