const path = require('path');
const express = require("express");
// const session = require('express-session')

const bodyParser = require("body-parser");

const config = require("./lib/config");
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

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

const adminRoutes = require('./routes/admin');
const workRoutes = require('./routes/work');

app.use(adminRoutes);
app.use(workRoutes);

app.use(errorController.get404);


mongoConnect(() => {
  app.listen(config.httpPort, () => {
    console.log(`kolbert.ru started and listening on port ${config.httpPort}`);
  });

});