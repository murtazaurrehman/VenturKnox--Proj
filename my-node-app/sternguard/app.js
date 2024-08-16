var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const initializeObjection = require('./db');
const authRouter = require('./routes/auth'); // Assuming you have auth routes
var usersGetter = require('./routes/UserRoutes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const User = require('./models/User');
const PermissionAssignment = require('./models/PermissionAssignment');
const { validateToken } = require('./auth'); // Function to validate token
const jwt = require('jsonwebtoken');
const url = require('url');

var app = express();
const knex = initializeObjection();
const SECRET_KEY = process.env.JWT_SECRET || 'yoursecretkey';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files



// Define routes
app.use('/validate-token', validateToken);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', usersGetter);
// app.use('/auth', authRouter); // Uncomment if auth routes are needed

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server Started on ' + PORT);
});

module.exports = app;
