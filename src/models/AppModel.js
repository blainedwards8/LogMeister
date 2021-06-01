const Datastore = require('nedb-promise');
let name = "apps";
const db = process.env.NODE_ENV == "test" ? new Datastore({autoload: true}) : new Datastore({filename: `../../dbs/${name}.db`, autoload: true});
db.ensureIndex({fieldName: "name", unique: true});
module.exports = db;