"use strict";
import {define, factory, IFactory, inject, singleton} from 'appolo';
import {ILogger} from "@appolo/logger";
import {IOptions} from "../index";
import {Queue} from 'appolo-queue';


@define()
@singleton()
@factory()
export class QueueClient implements IFactory<Queue> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IOptions;

    public async get(): Promise<Queue> {

        try {
            let client = new Queue(this.moduleOptions.config);

            await client.initialize();

            return client;


        } catch (e) {

            this.logger.error(`failed to initialize queue ${this.moduleOptions.id}`, {err: e.toString()});

            throw e;
        }


    }
}
