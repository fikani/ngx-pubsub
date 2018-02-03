"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var publisher = /** @class */ (function () {
    function publisher() {
        this.subscriptions = new Map();
    }
    publisher.emit = function (name, data) {
        var fnName = publisher.createName(name);
        publisher.subjects[fnName] || (publisher.subjects[fnName] = new Subject_1.Subject());
        publisher.subjects[fnName].next(data);
    };
    publisher.subject = function (name) {
        var fnName = publisher.createName(name);
        return this.subjects[fnName] || (this.subjects[fnName] = new Subject_1.Subject());
    };
    publisher.prototype.dispose = function () {
        var subjects = publisher.subjects;
        for (var prop in subjects) {
            if (Object.hasOwnProperty.call(subjects, prop)) {
                subjects[prop].unsubscribe();
            }
        }
        publisher.subjects = {};
        this.subscriptions.clear();
    };
    publisher.createName = function (name) {
        return "$" + name;
    };
    publisher.subjects = {};
    return publisher;
}());
exports.publisher = publisher;
function subscribe(event) {
    if (event === void 0) { event = null; }
    return function (target, propertyKey, descriptor) {
        var original = descriptor.value;
        var ngOnInit = Object.getOwnPropertyDescriptor(target, "ngOnInit");
        Object.defineProperty(target, "ngOnInit", {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var ctx = this;
                publisher.subject(event).subscribe(function (data) {
                    original.call(ctx, data);
                });
                (_a = ngOnInit.value).apply.apply(_a, [this].concat(args));
                var _a;
            }
        });
        return descriptor;
    };
}
exports.subscribe = subscribe;
//# sourceMappingURL=publisher.js.map