const config = require("./lib/config");

const express = require("express");
const app = express();

app.set('view engine', 'ejs')
app.set('views', 'app/views')

const bodyParser = require("body-parser");

const adminRouter = require('./routes/admin')
const resumeRouter = require('./routes/resume')
const protfolioRouter = require('./routes/protfolio')
const contactRouter = require('./routes/contact')
const indexRouter = require('./routes/index')
const errorRouter = require('./routes/404')
const publicRouter = require('./routes/public')

console.log(process.cwd())


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(publicRouter);


app.use(adminRouter);
app.use(resumeRouter);
app.use(protfolioRouter);
app.use(contactRouter);
app.use(indexRouter);
app.use(errorRouter)

app.listen(config.httpPort, () => {
  console.log(`Example app listening on port ${config.httpPort}`);
});