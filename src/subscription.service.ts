import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Rx";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class SubscriptionService {
  private static subjects: { [name: string]: Subject<any> } = {};

  emit<T>(name: string, data?: T): void {
    let subject = this.subject(name);
    subject.next(data);
  }

  subject<T>(name: string): Subject<T> {
    var fnName = this.createName(name);
    let subject =
      SubscriptionService.subjects[fnName] ||
      (SubscriptionService.subjects[fnName] = new ReplaySubject(1));
    return subject;
  }

  dispose() {
    let subjects = SubscriptionService.subjects;
    for (let prop in subjects) {
      if (Object.hasOwnProperty.call(subjects, prop)) {
        subjects[prop].unsubscribe();
      }
    }
    SubscriptionService.subjects = {};
  }

  private createName(name: string) {
    return "$" + name;
  }
}

let pub = new SubscriptionService();
export function subscribe(event: string = null) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor = null
  ): PropertyDescriptor | any {
    let original;
    if (!descriptor) {
      let newPropertyName = `__${propertyKey}__$`;
      createPropertyDescriptor(target, propertyKey, newPropertyName);
      original = Object.getOwnPropertyDescriptor(target, newPropertyName).value;
    } else {
      original = descriptor.value || descriptor.set;
    }

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
          if (typeof ctx[propertyKey] === "function") {
            ctx[propertyKey](data);
          } else {
            original.call(ctx, data);
          }
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
    if (descriptor) return descriptor;
  };
}

function createPropertyDescriptor(
  target: any,
  propertyKey: string,
  newPropertyName: string
): void {
  Object.defineProperty(target, newPropertyName, {
    value: function(data) {
      this[propertyKey] = data;
    },
    writable: true
  });
}
