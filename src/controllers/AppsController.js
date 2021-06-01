const AppService = require('../services/AppService');
const AppModel = require('../models/AppModel');
const appService = new AppService(AppModel);

const router = require('express').Router();
    router.get('/', async (req,res) => {
        let apps = await appService.getApps();
        res.json(apps);
    });

    router.get('/:name', async(req,res) => {
        let {name} = req.params;
        let app = await appService.getApp({name});
        res.json(app);
    });

    router.get('/:name/generate_api_key', async(req,res) => {
        let {name} = req.params;
        let app = await appService.generateApiKey(name);
        res.json(app);
    });

    router.get('/:name/api_key', async(req,res) => {
        let api_key = await appService.getApiKey();
        res.send(api_key);
    });
module.exports = router;