import { Component, OnInit } from "@angular/core";
import { subscribe } from "../../dist";

@Component({
  selector: "comp2",
  templateUrl: "../comp2/comp2.component.html"
})
export class Comp2Component implements OnInit {
  constructor() {}

  ngOnInit() {}

  @subscribe("test")
  onTest(data: any) {
    console.log(this, "Event: test => ", data);
  }
}
