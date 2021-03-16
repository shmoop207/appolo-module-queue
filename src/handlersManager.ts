"use strict";
import {define, Define, init, inject, Injector, singleton} from '@appolo/inject'
import {IApp} from '@appolo/engine'
import {HandlerMetadata, MessageHandlerSymbol,} from "./decorators";
import {ILogger} from '@appolo/logger';
import {Reflector,Arrays} from '@appolo/utils';
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

    @init()
    public async initialize() {

        this.app.tree.parent.discovery.exported.forEach(item => this._createHandler(item.fn, item.define));
    }

    private _createHandler(fn: Function, define: Define) {

        let handlers = Reflector.getFnMetadata<HandlerMetadata>(MessageHandlerSymbol, fn);

        if (!handlers) {
            return;
        }

        Arrays.forEach(handlers, handler => {

            this.queueClient.handle(handler.eventName, async (job: Job) => {
                return this.app.tree.parent.injector.get(define.definition.id)[handler.propertyKey](job)
            });


        });

    }


}
