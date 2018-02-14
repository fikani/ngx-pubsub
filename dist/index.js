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
     * @template T
     * @param {?} name
     * @param {?=} data
     * @return {?}
     */
    SubscriptionService.prototype.emit = /**
     * @template T
     * @param {?} name
     * @param {?=} data
     * @return {?}
     */
    function (name, data) {
        var /** @type {?} */ fnName = this.createName(name);
        SubscriptionService.subjects[fnName] ||
            (SubscriptionService.subjects[fnName] = new Subject$1());
        SubscriptionService.subjects[fnName].next(data);
    };
    /**
     * @template T
     * @param {?} name
     * @return {?}
     */
    SubscriptionService.prototype.subject = /**
     * @template T
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var /** @type {?} */ fnName = this.createName(name);
        return (SubscriptionService.subjects[fnName] ||
            (SubscriptionService.subjects[fnName] = new Subject$1()));
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
    SubscriptionService.prototype.createName = /**
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
        var /** @type {?} */ pub = new SubscriptionService();
        var /** @type {?} */ subject = pub.subject(event);
        var /** @type {?} */ ngOnInit = Object.getOwnPropertyDescriptor(target, "ngOnInit");
        // console.log("ngOnInit: " + ngOnInit)
        var /** @type {?} */ ngOnDestroy = Object.getOwnPropertyDescriptor(target, "ngOnDestroy");
        // console.log("ngOnDestroy: " + ngOnDestroy)
        var /** @type {?} */ subs = null;
        //auto subscribing
        Object.defineProperty(target, "ngOnInit", {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var /** @type {?} */ ctx = this;
                /**
                 * @param {?} data
                 * @return {?}
                 */
                function exec(data) {
                    original.call(ctx, data);
                }
                subs = subject.subscribe(exec);
                if (ngOnInit) {
                    (_a = ngOnInit.value).apply.apply(_a, [this].concat(args));
                }
                var _a;
            }
        });
        //auto unsubscribing
        Object.defineProperty(target, "ngOnDestroy", {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.log("ngOndestroy unsubscribe");
                subs.unsubscribe();
                if (ngOnDestroy) {
                    (_a = ngOnDestroy.value).apply.apply(_a, [this].concat(args));
                }
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
                    exports: [], providers: [SubscriptionService]
                },] },
    ];
    /** @nocollapse */
    PubSubModule.ctorParameters = function () { return []; };
    return PubSubModule;
}());

export { PubSubModule, SubscriptionService, subscribe };
