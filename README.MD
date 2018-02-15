# @fikani/ngx-pubsub

## About

This library helps people to use a simple Publisher/Subscriber module taking advantage of the rxjs/Observable api present in Angular 2+.

## Installation

To install this library, run:

```bash
$ npm install @fikani/ngx-pubsub --save
```

## Usage

Add the `PubSubModule` to your Angular `AppModule`:

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

// Import the module
import { PubSubModule } from "@fikani/ngx-pubsub";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // import here
    PubSubModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Once it is imported, you can use the `subscribe` decorator in your Angular components.
It works with: class members (including arrow functions), `set` property acessor and class methods.

```typescript
import { Component, OnInit } from '@angular/core';
import { subscribe } from '@fikani/ngx-pubsub';

@Component({...})
export class MyComponent {
  @subscribe("test") myProp: string;

  @subscribe("test")
  handler = (data: any) => {
    console.log("arrow function", data);
  };

  @subscribe("test")
  set todo(data: any) {
    console.log("todo", data);
  }

  @subscribe("test")
  onTest(data: any) {
    console.log(this, "Event: test => ", data);
  }
}
```

Don't worry about unsubscribing the observables on components, it is done under the hood by using the component's lifecyle hooks.
You also have to emit the notification to the observers. To do so, use the `SubscriptionService`:

```typescript
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";
import { SubscriptionService } from "@fikani/ngx-pubsub";

@Injectable()
export class PublisherService {
  test$ = this.sub.subject("test").subscribe(data => {
    console.log("service: " + data);
  });
  constructor(private sub: SubscriptionService) {
    //example
    Observable.interval(1000).subscribe(n => {
      this.sub.emit("test", n);
    });
  }
}
```

## License

MIT © [Afif Fikani](mailto:afif.fikani@gmail.com)
