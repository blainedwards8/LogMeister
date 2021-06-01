class Log {
    constructor(LogModel, AppModel) {
        this.LogModel = LogModel;
        this.AppModel = AppModel;
        this.log_levels = ['Info', 'Debug', 'Warn', 'Error'];
    }

    async getLogs(app_name, opts) {
        if(app_name == null || app_name == undefined || app_name == "") throw "Name is missing";
        opts = opts || {};
        opts.app_name = app_name;
        let logs = await this.LogModel.find(opts);
        return logs;
    }

    async addLog(app_name, message, level, author) {
        if(!app_name) throw "Missing app name";
        if(!message) throw "Missing message";
        if(!level || !this.log_levels.includes(level)) throw "Level must be Info, Debug, Warn, or Error";
        if(!author || !author.email) throw "Missing author";

        //ensure app exists
        let app = await this.AppModel.findOne({name: app_name});
        if(!app) throw "App must exist";

        let created = new Date();

        let log = await this.LogModel.insert({app_name, message, level, author, created});
        return log;
    }
}

module.exports = Log;