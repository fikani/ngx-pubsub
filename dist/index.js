import { Injectable, NgModule } from '@angular/core';
import { Subject as Subject$1 } from 'rxjs/Subject';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SubscriptionService = (function () {
    function SubscriptionService() {
        this.subscriptions = new Map();
    }
    /**
     * @param {?} name
     * @param {?=} data
     * @return {?}
     */
    SubscriptionService.emit = /**
     * @param {?} name
     * @param {?=} data
     * @return {?}
     */
    function (name, data) {
        var /** @type {?} */ fnName = SubscriptionService.createName(name);
        SubscriptionService.subjects[fnName] || (SubscriptionService.subjects[fnName] = new Subject$1());
        SubscriptionService.subjects[fnName].next(data);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    SubscriptionService.subject = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ fnName = SubscriptionService.createName(name);
        return this.subjects[fnName] || (this.subjects[fnName] = new Subject$1());
    };
    /**
     * @return {?}
     */
    SubscriptionService.prototype.dispose = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ subjects = SubscriptionService.subjects;
        for (var /** @type {?} */ prop in subjects) {
            if (Object.hasOwnProperty.call(subjects, prop)) {
                subjects[prop].unsubscribe();
            }
        }
        SubscriptionService.subjects = {};
        this.subscriptions.clear();
    };
    /**
     * @param {?} name
     * @return {?}
     */
    SubscriptionService.createName = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return "$" + name;
    };
    SubscriptionService.subjects = {};
    SubscriptionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SubscriptionService.ctorParameters = function () { return []; };
    return SubscriptionService;
}());
/**
 * @param {?=} event
 * @return {?}
 */
function subscribe(event) {
    if (event === void 0) { event = null; }
    return function (target, propertyKey, descriptor) {
        var /** @type {?} */ original = descriptor.value;
        var /** @type {?} */ ngOnInit = Object.getOwnPropertyDescriptor(target, "ngOnInit");
        Object.defineProperty(target, "ngOnInit", {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var /** @type {?} */ ctx = this;
                SubscriptionService.subject(event).subscribe(function (data) {
                    original.call(ctx, data);
                });
                (_a = ngOnInit.value).apply.apply(_a, [this].concat(args));
                var _a;
            }
        });
        return descriptor;
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PubSubModule = (function () {
    function PubSubModule() {
    }
    /**
     * @return {?}
     */
    PubSubModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: PubSubModule,
            providers: [SubscriptionService]
        };
    };
    PubSubModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [],
                    exports: []
                },] },
    ];
    /** @nocollapse */
    PubSubModule.ctorParameters = function () { return []; };
    return PubSubModule;
}());

export { PubSubModule, SubscriptionService, subscribe };
