# @fikani/ngx-pubsub
## About

This library helps people to use a simple Publisher/Subscriber module taking advantage of the rxjs/Observable api poresent in Angular 2+.

## Installation

To install this library, run:

```bash
$ npm install @fikani/ngx-pubsub --save
```

## Usage


Add the `PubSubModule` to your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { PubSubModule } from '@fikani/ngx-pubsub';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    PubSubModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once it is imported, you can use the `subscribe` decorator in your Angular components:

```typescript
import { Component, OnInit } from '@angular/core';
import { subscribe } from '@fikani/ngx-pubsub';

@Component({...})
export class MyComponent {
  @subscribe("test")
  myMethod(data) {
    console.log("comp1 : " + data)
  }
}
```
Don't worry about unsubscribing the observables on components, it is done under the hood using the component's lifecyle hooks. 
You also have to emit the notification to the observers. To do so, use the `SubscritionService`:
```typescript
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { SubscriptionService } from '@fikani/ngx-pubsub';

@Injectable()
export class PublisherService {
  constructor(private sub: SubscriptionService) {
    //example
    Observable.interval(1000).subscribe(n => {
      this.sub.emit("test", n)
    })
  }
}
```

## License

MIT © [Afif Fikani](mailto:afif.fikani@gmail.com)
