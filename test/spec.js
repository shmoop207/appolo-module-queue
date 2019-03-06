"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_1 = require("appolo");
const Q = require("bluebird");
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
        app = appolo_1.createApp({ root: __dirname, environment: "production", port: 8181 });
        await app.module(new index_1.QueueModule({ config: { queueName: "queue-module-test", redis: process.env.REDIS } }));
        await app.launch();
    });
    it("should publish events", async () => {
        let queue = app.injector.get("queue");
        await queue.create("test", { param1: "testParam" })
            .exec();
        await Q.delay(1000);
        app.injector.get(handler_1.Handler).working.should.be.eq("testParam");
        await app.reset();
    });
});
//# sourceMappingURL=spec.js.map