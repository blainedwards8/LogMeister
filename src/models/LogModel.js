const Datastore = require('nedb-promise');
let name = "logs";
const db = process.env.NODE_ENV == "test" ? new Datastore({autoload: true}) : new Datastore({filename: `../../dbs/${name}.db`, autoload: true});
db.ensureIndex({fieldName: "app_name"});
db.ensureIndex({fieldName: "level"});
module.exports = db;