"use strict";
import {define, Define, IApp, initMethod, inject, Injector, singleton,Util} from 'appolo'
import * as _ from "lodash";
import {HandlerMetadata, MessageHandlerSymbol,} from "./decorators";
import {ILogger} from '@appolo/logger';
import {IOptions} from "../index";
import {Job, Queue} from "appolo-queue";

@define()
@singleton()
export class HandlersManager {

    @inject() private moduleOptions: IOptions;
    @inject() private injector: Injector;
    @inject() private app: IApp;
    @inject() protected logger: ILogger;
    @inject() protected queueClient: Queue;

    private _handlers = new Map<string, { define: Define, propertyKey: string }[]>();

    @initMethod()
    public async initialize() {

        _.forEach(this.app.parent.exported, (item => this._createHandler(item.fn, item.define)));
    }

    private _createHandler(fn: Function, define: Define) {

        let handlers = Util.getReflectData<HandlerMetadata>(MessageHandlerSymbol, fn);

        if (!handlers) {
            return;
        }

        _.forEach(handlers, handler => {

            this.queueClient.handle(handler.eventName, async (job: Job) => {
                return this.app.parent.injector.get(define.definition.id)[handler.propertyKey](job)
            });


        });

    }


}
