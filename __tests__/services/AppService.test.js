require('dotenv').config();
const AppService = require('../../src/services/AppService');
const AppModel = require('../../src/models/AppModel');
const appService = new AppService(AppModel);

describe("AppService Testing", () => {
    describe("createApp", () => {
        test("it should create an app with an api key", (done) => {
            appService.createApp("Test App").then(results => {
                expect(results._id).not.toBeNull();
                expect(results.name).toBe("Test App");
                expect(results.apiKey).not.toBeNull();
                done();
            });
        });

        test("it should throw and error if name is blank", (done) => {
            appService.createApp("").catch(e => {
                expect(e).toBe("Name is missing");
                done();
            });
        });

        test("it should throw an error if name is ''", done => {
            appService.createApp().catch(e => {
                expect(e).toBe("Name is missing");
                done();
            });
        });

        test("it should throw an error if name is duplicate", done => {
            appService.createApp("Duplicate").then(_ => {
                return appService.createApp("Duplicate");
            }).catch(e => {
                expect(e).not.toBeNull();
                done();
            });
        });
    });

    describe("generateApiKey", () => {
        test("Should generate a new api key", (done) => {
            let oldApiKey, newApiKey;
            appService.createApp("apiKeyTest").then(results => {
                oldApiKey = results.apiKey;
                return appService.generateApiKey("apiKeyTest");
            }).then(results => {
                newApiKey = results.apiKey;
                expect(newApiKey).not.toBe(oldApiKey);
                expect(newApiKey).not.toBeNull();
                expect(newApiKey).not.toBe(undefined);
                done();
            });
        });

        test("It should throw an error if name is missing", done => {
            appService.generateApiKey().catch(e => {
                expect(e).toBe("Name is missing");
                done();
            });
        });
    });

    describe("getApp", () => {
        test("expect first id and second id to match", done => {
            let first_id, second_id;
            appService.createApp("getTest").then(results => {
                first_id = results._id;
                return appService.getApp("getTest");
            }).then(results => {
                second_id = results._id;
                expect(first_id).toBe(second_id);
                done();
            });
        });

        test("It should throw an error if name is missing", done => {
            appService.generateApiKey().catch(e => {
                expect(e).toBe("Name is missing");
                done();
            });
        });
    });
});