"use strict";

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var initializeObjection = require('./db');

var authRouter = require('./routes/auth'); // Assuming you have auth routes


var usersGetter = require('./routes/UserRoutes');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var User = require('./models/User');

var PermissionAssignment = require('./models/PermissionAssignment');

var _require = require('./auth'),
    validateToken = _require.validateToken; // Function to validate token


var jwt = require('jsonwebtoken');

var url = require('url');

var app = express();
var knex = initializeObjection();
var SECRET_KEY = process.env.JWT_SECRET || 'yoursecretkey';
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public'))); // Serve static files
// Define routes

app.use('/validate-token', validateToken);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', usersGetter); // app.use('/auth', authRouter); // Uncomment if auth routes are needed
// Start the server

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server Started on ' + PORT);
});
module.exports = app;