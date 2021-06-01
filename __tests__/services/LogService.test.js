require('dotenv').config();
const LogService = require('../../src/services/LogService');
const AppService = require('../../src/services/AppService');
const AppModel = require('../../src/models/AppModel');
const LogModel = require('../../src/models/LogModel');
const logService = new LogService(LogModel, AppModel);
const appService = new AppService(AppModel);

let tcase = {app_name: "LogTestApp", message: "This is a test message", level: "Debug", author: {email: "test@example.com"}};

beforeAll(done => {
    appService.createApp(tcase.app_name).then(_ => {
        done();
    }) ;
});

describe("LogService", () => {
    describe("addLog", () => {
        test("should return an object if all information is supplied and valid app name", done => {
            logService.addLog(tcase.app_name, tcase.message, "Debug", tcase.author).then(results => {
                expect(results._id).not.toBeNull();
                expect(results.app_name).toBe(tcase.app_name);
                expect(results.message).toBe(tcase.message);
                expect(results.level).toBe(tcase.level);
                expect(results.author).not.toBeNull();
                expect(results.author.email).toStrictEqual(tcase.author.email);
                expect(results.created).not.toBeNull();
                done();
            });
        });

        test("should throw an error if app_name is ''", done => {
            logService.addLog("", tcase.message, tcase.level, tcase.author).catch(e => {
                expect(e).toBe("Missing app name");
                done();
            });
        });

        test("should throw an error if app_name is undefined", done => {
            logService.addLog(undefined, tcase.message, tcase.level, tcase.author).catch(e => {
                expect(e).toBe("Missing app name");
                done();
            });
        });

        test("should throw an error if app_name is null", done => {
            logService.addLog(null, tcase.message, tcase.level, tcase.author).catch(e => {
                expect(e).toBe("Missing app name");
                done();
            });
        });

        test("should throw an error if app not found", done => {
            logService.addLog("WrongApp", tcase.message, tcase.level, tcase.author).catch(e => {
                expect(e).toBe("App must exist");
                done();
            });
        });

        test("should throw an error if message not found", done => {
            logService.addLog(tcase.app_name, null, tcase.level, tcase.author).catch(e => {
                expect(e).toBe("Missing message");
                done();
            });
        });

        test("should throw an error if level not found", done => {
            logService.addLog(tcase.app_name, tcase.message, null, tcase.author).catch(e => {
                expect(e).toBe("Level must be Info, Debug, Warn, or Error");
                done();
            });
        });

        test("should throw an error if level included in log levels array", done => {
            logService.addLog(tcase.app_name, tcase.message, "Other", tcase.author).catch(e => {
                expect(e).toBe("Level must be Info, Debug, Warn, or Error");
                done();
            });
        });

        test("should throw an error if missing author", done => {
            logService.addLog(tcase.app_name, tcase.message, tcase.level).catch(e => {
                expect(e).toBe("Missing author");
                done();
            });
        });
    });

    describe("getLogs", () => {
        test("it should return one item when level is filtered", done => {
            logService.addLog(tcase.app_name, "Second Message", "Error", tcase.author).then(results => {
                return logService.getLogs(tcase.app_name, {level: "Debug"});
            }).then(results => {
                console.log(results);
                expect(results.length).toBe(1);
                done();
            });
        });
    });
});