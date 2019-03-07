const path = require('path');
const express = require("express");
// const session = require('express-session')

const bodyParser = require("body-parser");
// const mongoose = require('mongoose');

const config = require("./lib/config");
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// app.use(session({
//   secret: '1111',
//   resave: true,
//   saveUninitialized: true
// }))

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5c52eb0878682e68f08244a9')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
})

const adminRoutes = require('./routes/admin');
const workRoutes = require('./routes/work');
const authRoutes = require('./routes/auth');

app.use(adminRoutes);
app.use(workRoutes);
app.use(authRoutes);
app.use(errorController.get404);


mongoConnect(() => {
  app.listen(config.httpPort, () => {
    console.log(`kolbert.ru started and listening on port ${config.httpPort}`);
  });

});

// mongoose.connect(`mongodb+srv://${config.mongouser}:${config.mongopass}@cluster0-zrs2t.mongodb.net/${config.mongoDB}?retryWrites=true`)
//   .then(result => {
//     app.listen(config.httpPort, () => {
//       console.log(`kolbert.ru started and listening on port ${config.httpPort}`);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });