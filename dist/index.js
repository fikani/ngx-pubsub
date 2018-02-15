import { Injectable, NgModule } from '@angular/core';
import { ReplaySubject as ReplaySubject$1 } from 'rxjs/ReplaySubject';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SubscriptionService = (function () {
    function SubscriptionService() {
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
        var /** @type {?} */ subject = this.subject(name);
        subject.next(data);
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
        var /** @type {?} */ subject = SubscriptionService.subjects[fnName] ||
            (SubscriptionService.subjects[fnName] = new ReplaySubject$1(1));
        return subject;
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
var pub = new SubscriptionService();
/**
 * @param {?=} event
 * @return {?}
 */
function subscribe(event) {
    if (event === void 0) { event = null; }
    return function (target, propertyKey, descriptor) {
        if (descriptor === void 0) { descriptor = null; }
        var /** @type {?} */ original;
        if (!descriptor) {
            var /** @type {?} */ newPropertyName = "__" + propertyKey + "__$";
            createPropertyDescriptor(target, propertyKey, newPropertyName);
            original = Object.getOwnPropertyDescriptor(target, newPropertyName).value;
        }
        else {
            original = descriptor.value || descriptor.set;
        }
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
                    if (typeof ctx[propertyKey] === "function") {
                        ctx[propertyKey](data);
                    }
                    else {
                        original.call(ctx, data);
                    }
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
        if (descriptor)
            return descriptor;
    };
}
/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} newPropertyName
 * @return {?}
 */
function createPropertyDescriptor(target, propertyKey, newPropertyName) {
    Object.defineProperty(target, newPropertyName, {
        value: function (data) {
            this[propertyKey] = data;
        },
        writable: true
    });
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
