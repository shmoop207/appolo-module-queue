"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = exports.Events = exports.handler = exports.Queue = exports.Job = void 0;
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const queueClient_1 = require("./src/queueClient");
const decorators_1 = require("./src/decorators");
Object.defineProperty(exports, "handler", { enumerable: true, get: function () { return decorators_1.handler; } });
const appolo_queue_1 = require("appolo-queue");
Object.defineProperty(exports, "Events", { enumerable: true, get: function () { return appolo_queue_1.Events; } });
Object.defineProperty(exports, "Job", { enumerable: true, get: function () { return appolo_queue_1.Job; } });
Object.defineProperty(exports, "Queue", { enumerable: true, get: function () { return appolo_queue_1.Queue; } });
let QueueModule = /** @class */ (() => {
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
    return QueueModule;
})();
exports.QueueModule = QueueModule;
//# sourceMappingURL=index.js.map