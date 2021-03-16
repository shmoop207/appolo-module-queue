"use strict";
import {IModuleParams, module, Module} from '@appolo/engine';
import {QueueClient} from "./src/queueClient";
import {handler} from "./src/decorators";

import {Events, IHandlerOptions, IJobOptions, IOptions as IQueueOptions, Job, Queue} from 'appolo-queue';


export {Job, Queue, handler, Events, IHandlerOptions, IJobOptions, IQueueOptions}

export interface IOptions {
    id?: string,
    config?: IQueueOptions
}


@module()
export class QueueModule extends Module<IOptions> {

    public static for(options: IOptions): IModuleParams {
        return {type: QueueModule, options}
    }

    protected readonly Defaults: Partial<IOptions> = {
        id: "queue"
    };


    public get exports() {
        return [{id: this.moduleOptions.id, type: QueueClient}];
    }
}
