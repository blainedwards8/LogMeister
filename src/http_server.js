const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* NO AUTH AREA */
app.post('/login', require('./controllers/routes/login'));

/* AUTHENTICATED AREA */
app.use(require('./middleware/auth'));

app.use(require('./controllers/logs'));
app.use(require('./controllers/users'));
app.use(require('./controllers/apps'));

module.exports = app;