const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const compression = require('compression');

const morgan = require('morgan');
const fs = require('fs');


// const mongoose = require('mongoose');

// const config = require("./lib/config");
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zrs2t.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(compression());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream:accessLogStream}));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});


app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

const adminRoutes = require('./routes/admin');
const workRoutes = require('./routes/work');
const authRoutes = require('./routes/auth');

app.use(adminRoutes);
app.use(workRoutes);
app.use(authRoutes);
app.use(errorController.get404);




mongoConnect(() => {

  let port = process.env.PORT || 2999;
  app.listen(port, () => {
    console.log(`kolbert.ru started and listening on port ${port}`);
  });

});