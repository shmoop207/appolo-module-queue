"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("@appolo/engine");
const utils_1 = require("@appolo/utils");
const handler_1 = require("./src/handler");
const index_1 = require("../index");
const chai = require("chai");
const sinonChai = require("sinon-chai");
let should = require('chai').should();
chai.use(sinonChai);
describe("PubSub Spec", function () {
    let app;
    if (!process.env.REDIS) {
        throw new Error(`please define process.env.REDIS`);
    }
    beforeEach(async () => {
        app = engine_1.createApp({ root: __dirname, environment: "production" });
        await app.module.use(index_1.QueueModule.for({ config: { queueName: "queue-module-test", redis: process.env.REDIS } }));
        await app.launch();
    });
    it("should publish events", async () => {
        let queue = app.injector.get("queue");
        await queue.create("test", { param1: "testParam" })
            .exec();
        await utils_1.Promises.delay(2000);
        app.injector.get(handler_1.Handler).working.should.be.eq("testParam");
        await app.reset();
    });
});
//# sourceMappingURL=spec.js.map