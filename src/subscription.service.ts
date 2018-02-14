import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Rx";

@Injectable()
export class SubscriptionService {
  private static subjects: { [name: string]: Subject<any> } = {};
  subscriptions: Map<any, Subscription> = new Map();

  emit<T>(name: string, data?: T): void {
    var fnName = this.createName(name);
    SubscriptionService.subjects[fnName] ||
      (SubscriptionService.subjects[fnName] = new Subject());
    SubscriptionService.subjects[fnName].next(data);
  }

  subject<T>(name: string): Subject<T> {
    var fnName = this.createName(name);
    return (
      SubscriptionService.subjects[fnName] ||
      (SubscriptionService.subjects[fnName] = new Subject())
    );
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
  private createName(name: string) {
    return "$" + name;
  }
}

export function subscribe(event: string = null) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    let pub = new SubscriptionService();
    let subject = pub.subject(event);

    let ngOnInit: PropertyDescriptor = Object.getOwnPropertyDescriptor(
      target,
      "ngOnInit"
    );

    // console.log("ngOnInit: " + ngOnInit)

    let ngOnDestroy: PropertyDescriptor = Object.getOwnPropertyDescriptor(
      target,
      "ngOnDestroy"
    );

    // console.log("ngOnDestroy: " + ngOnDestroy)

    let subs = null;
    //auto subscribing
    Object.defineProperty(target, "ngOnInit", {
      value: function(...args) {
        let ctx = this;

        function exec(data: any) {
          original.call(ctx, data);
        }

        subs = subject.subscribe(exec);
        if (ngOnInit) {
          ngOnInit.value.apply(this, ...args);
        }
      }
    });
    //auto unsubscribing
    Object.defineProperty(target, "ngOnDestroy", {
      value: function(...args) {
        console.log("ngOndestroy unsubscribe");
        subs.unsubscribe();
        if (ngOnDestroy) {
          ngOnDestroy.value.apply(this, ...args);
        }
      }
    });
    return descriptor;
  };
}
