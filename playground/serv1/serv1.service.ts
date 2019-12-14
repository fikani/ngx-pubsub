import { Injectable } from "@angular/core";
import { SubscriptionService } from "../../dist";
import { interval } from "rxjs";
import "rxjs/add/observable/interval";

@Injectable()
export class Serv1Service {
  // test = this.pub.subject("test").subscribe(_ => {
  //   console.log(this, "received: ", _);
  // });

  constructor(private pub: SubscriptionService) {
    interval(1000).subscribe(_ => {
      this.pub.emit("test", "from : Serv1 " + _);
    });
  }
}
