const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport')
const categorRouter = require('./routes/category');
const usersRouter = require('./routes/auth');
const contentRouter = require('./routes/content');
const { routeCons } = require('./utils/func').funcUtility;

require('dotenv').config(); // .env configuration will access to enviorment variables
require('./utils/mongoDb'); // Mongo connection
const db = require('./utils/sqlDb'); // SQL Connection
require('./utils/passport'); // passport intialization

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())


// User Auth Routes Middleware
app.use(routeCons.ROUTES_CONSTANTS.API_PREFIX, usersRouter);

// Category Routes Middleware
app.use( routeCons.ROUTES_CONSTANTS.API_PREFIX, categorRouter);

// Content Route Middleware
app.use( routeCons.ROUTES_CONSTANTS.API_PREFIX, contentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
db.sync().then(res => {
  console.log(res.models);
})

module.exports = app;
