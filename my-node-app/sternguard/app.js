var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const initializeObjection = require('./db');
const authRouter = require('./routes/auth'); // Add this line
var usersGetter = require('./routes/UserRoutes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { validateToken } = require('./auth'); // Import the function

var app = express();
const knex = initializeObjection();
const SECRET_KEY = 'yoursecretkey';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files



app.use('/validate-token', validateToken);
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/auth', authRouter); // Add this line
app.use('/user',usersGetter);
// sternguard/app.js (continued)

// app.post('/validate-token', async (req, res) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).json({ error: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userRole = await validateToken(decoded);

//         // Check if the user has the required role for the requested URL
//         if (userRole && hasAccess(userRole, req.path)) {
//             return res.status(200).json({ status: 'ok' });
//         } else {
//             return res.status(403).json({ error: 'Access denied' });
//         }
//     } catch (error) {
//         return res.status(401).json({ error: 'Invalid token' });
//     }
// });

// function hasAccess(role, path) {
//     // Implement your role-based access logic here
//     const rolePermissions = {
//         admin: ['/servicer/', '/httpbin/', '/sternguard/'],
//         user: ['/servicer/'],
//         guest: ['/httpbin/']
//     };

//     return rolePermissions[role]?.includes(path);
// }



const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Server Started on ' + PORT);
});

module.exports = app;
