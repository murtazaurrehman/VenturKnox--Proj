"use strict";

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var initializeObjection = require('./db');

var authRouter = require('./routes/auth'); // Add this line


var usersGetter = require('./routes/UserRoutes');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var app = express();
var knex = initializeObjection();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public'))); // Serve static files

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter); // Add this line

app.use('/user', usersGetter);
var PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log('Server Started on ' + PORT);
});
module.exports = app;