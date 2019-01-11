const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");

const config = require("./lib/config");
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'app/views')

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/public', express.static(path.join(__dirname, 'public')))

const adminRoutes = require('./routes/admin')
const workRoutes = require('./routes/work')

app.use(adminRoutes);
app.use(workRoutes);

app.use(errorController.get404);

app.listen(config.httpPort, () => {
  console.log(`Example app listening on port ${config.httpPort}`);
});