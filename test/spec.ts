import {App, createApp} from '@appolo/engine'
import {Queue} from 'appolo-queue'
import {Promises} from '@appolo/utils'
import {Handler} from "./src/handler";
import {QueueModule} from "../index";
import chai = require('chai');
import    sinonChai = require("sinon-chai");


let should = require('chai').should();
chai.use(sinonChai);


describe("PubSub Spec", function () {

    let app: App;

    if (!process.env.REDIS) {
        throw new Error(`please define process.env.REDIS`)
    }

    beforeEach(async () => {

        app = createApp({root: __dirname, environment: "production"});

        await app.module.use(QueueModule.for({config: {queueName:"queue-module-test",redis: process.env.REDIS}}));

        await app.launch();

    });

    it("should publish events", async () => {


        let queue =  app.injector.get<Queue>("queue");

        await queue.create("test", {param1: "testParam"})
            .exec();

        await Promises.delay(2000);

        app.injector.get<Handler>(Handler).working.should.be.eq("testParam");

        await app.reset();
    })
});


