const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* NO AUTH AREA */
app.post('/login', require('./controllers/routes/login'));

/* AUTHENTICATED AREA */
app.use(require('./controllers/middleware/auth'));

app.use(require('./controllers/LogsController'));
app.use(require('./controllers/UsersController'));
app.use(require('./controllers/AppsController'));

module.exports = app;