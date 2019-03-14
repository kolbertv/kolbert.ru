const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;

const getDb = require("../util/database").getDb;

class User {
  constructor(data) {
    this.name = data.username;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = new Date();
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({
      _id: new ObjectId(userId)
    });

  }

  static findOne(data) {
    const db = getDb();
    return db.collection("users").findOne(data);
  }
}

module.exports = User;