import { Component, OnInit } from "@angular/core";
import { subscribe } from "../../dist";

@Component({
  selector: "comp1",
  templateUrl: "../comp1/comp1.component.html"
})
export class Comp1Component implements OnInit {
  constructor() {}

  ngOnInit() {}

  @subscribe("test")
  onTest(data: any) {
    console.log(this, "Event: test => ", data);
  }
}
