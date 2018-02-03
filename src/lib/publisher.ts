import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Rx";

export class publisher {
  static subjects: { [name: string]: Subject<any> } = {};
  subscriptions: Map<any, Subscription> = new Map();

  static emit(name: string, data?: any): void {
    var fnName = publisher.createName(name);
    publisher.subjects[fnName] || (publisher.subjects[fnName] = new Subject());
    publisher.subjects[fnName].next(data);
  }

  static subject(name: string): Subject<any> {
    var fnName = publisher.createName(name);
    return this.subjects[fnName] || (this.subjects[fnName] = new Subject());
  }

  dispose() {
    let subjects = publisher.subjects;
    for (let prop in subjects) {
      if (Object.hasOwnProperty.call(subjects, prop)) {
        subjects[prop].unsubscribe();
      }
    }
    publisher.subjects = {};
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
      value: function(...args) {
        let ctx = this;
        publisher.subject(event).subscribe(data => {
          original.call(ctx, data);
        });
        ngOnInit.value.apply(this, ...args);
      }
    });
    return descriptor;
  };
}
