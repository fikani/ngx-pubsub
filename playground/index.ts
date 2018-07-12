/**
 * This is only for local test
 */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Component } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { PubSubModule, SubscriptionService } from "../dist";
import { Comp1Component } from "./comp1/comp1";
import { Comp2Component } from "./comp2/comp2";
import "rxjs/add/observable/interval";
import { Serv1Service } from "./serv1/serv1.service";

@Component({
  selector: "app",
  templateUrl: "app.component.html"
})
class AppComponent {
  toggle: boolean = true;

  constructor(private pub: SubscriptionService, private serv1: Serv1Service) {
    // Observable.interval(1000).subscribe(_ => {
    //   this.pub.emit("test", _);
    // });
  }
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, Comp1Component, Comp2Component],
  imports: [BrowserModule, PubSubModule],
  providers: [Serv1Service]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
