import { Injectable } from "@angular/core"
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Rx";

@Injectable()
export class SubscriptionService {
  static subjects: { [name: string]: Subject<any> } = {};
  subscriptions: Map<any, Subscription> = new Map();

  static emit(name: string, data?: any): void {
    var fnName = SubscriptionService.createName(name);
    SubscriptionService.subjects[fnName] || (SubscriptionService.subjects[fnName] = new Subject());
    SubscriptionService.subjects[fnName].next(data);
  }

  static subject(name: string): Subject<any> {
    var fnName = SubscriptionService.createName(name);
    return this.subjects[fnName] || (this.subjects[fnName] = new Subject());
  }

  dispose() {
    let subjects = SubscriptionService.subjects;
    for (let prop in subjects) {
      if (Object.hasOwnProperty.call(subjects, prop)) {
        subjects[prop].unsubscribe();
      }
    }
    SubscriptionService.subjects = {};
    this.subscriptions.clear();
  }
  private static createName(name: string) {
    return "$" + name;
  }
}

export function subscribe(event: string = null) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    let ngOnInit: PropertyDescriptor = Object.getOwnPropertyDescriptor(
      target,
      "ngOnInit"
    );
    Object.defineProperty(target, "ngOnInit", {
      value: function (...args) {
        let ctx = this;
        SubscriptionService.subject(event).subscribe(data => {
          original.call(ctx, data);
        });
        ngOnInit.value.apply(this, ...args);
      }
    });
    return descriptor;
  };
}
