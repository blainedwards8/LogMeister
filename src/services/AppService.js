var jwt = require('jsonwebtoken');

module.exports = class App {
    constructor(AppModel) {
        this.AppModel = AppModel;
    }

    async getApps() {
        const apps = await this.AppModel.find();
        return apps;
    }

    async getApp(name) {
        if(name == null || name == undefined || name == "") throw "Name is missing";
        const app = await this.AppModel.findOne({name});
        return app;
    }

    async createApp(name) {
        if(name == null || name == undefined || name == "") throw "Name is missing";
        let apiKey = jwt.sign({name}, process.env.JWTSECRET);
        const app = await this.AppModel.insert({name, apiKey});
        return app;
    }

    async generateApiKey(name) {
        if(name == null || name == undefined || name == "") throw "Name is missing";
        let apiKey = jwt.sign({name}, process.env.NODE_ENV);
        const apps = await this.AppModel.update({name}, {$set: {apiKey}}, {returnUpdatedDocs: true});
        return apps[1];
    }

    async getApiKey(name) {
        if(name == null || name == undefined || name == "") throw "Name is missing";
        const app = await this.AppModel.findOne({name});
        return app.apiKey;
    }
};