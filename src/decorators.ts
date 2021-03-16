import "reflect-metadata";
import {Reflector} from '@appolo/utils';

export const MessageHandlerSymbol = Symbol("MessageHandler");

export interface HandlerMetadata {
    [index: string]: {
        eventName: string
        propertyKey: string,
        descriptor: PropertyDescriptor
    }
}


export function handler(eventName: string) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {

        let data = Reflector.getFnMetadata<HandlerMetadata>(MessageHandlerSymbol, target.constructor, {});

        if (!data[propertyKey]) {
            data[propertyKey] = {
                eventName: eventName,
                propertyKey,
                descriptor
            };
        }


    }
}


