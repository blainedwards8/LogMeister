require('dotenv').config();
var app = require('./http_server');

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});