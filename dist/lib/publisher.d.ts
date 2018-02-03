import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Rx";
export declare class publisher {
    static subjects: {
        [name: string]: Subject<any>;
    };
    subscriptions: Map<any, Subscription>;
    static emit(name: string, data?: any): void;
    static subject(name: string): Subject<any>;
    dispose(): void;
    private static createName(name);
}
export declare function subscribe(event?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
