"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const queueClient_1 = require("./src/queueClient");
const decorators_1 = require("./src/decorators");
exports.handler = decorators_1.handler;
const appolo_queue_1 = require("appolo-queue");
exports.Events = appolo_queue_1.Events;
exports.Job = appolo_queue_1.Job;
exports.Queue = appolo_queue_1.Queue;
let QueueModule = class QueueModule extends appolo_1.Module {
    constructor(options) {
        super(options);
        this.Defaults = {
            id: "queue"
        };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: queueClient_1.QueueClient }];
    }
};
QueueModule = tslib_1.__decorate([
    appolo_1.module()
], QueueModule);
exports.QueueModule = QueueModule;
//# sourceMappingURL=index.js.map