var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const initializeObjection = require('./db');
const orderRouter= require('./routes/order'); // Add this line
var usersGetter = require('./routes/UserRoutes');
var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');

var app = express();
const knex = initializeObjection();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files



app.use('/', indexRouter);
app.use('/servicer/', (req, res) => {
    res.send('Servicer route');
  });
  
app.use('/servicer/menu', menuRouter);
app.use('/servicer/order', orderRouter); // Add this line
app.use('/servicer/user',usersGetter);




const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Server Started on ' + PORT);
});

module.exports = app;
