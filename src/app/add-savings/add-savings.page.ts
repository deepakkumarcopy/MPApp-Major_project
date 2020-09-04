import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-savings",
  templateUrl: "./add-savings.page.html",
  styleUrls: ["./add-savings.page.scss"],
})
export class AddSavingsPage implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}
  //navigate to add-month page
  addmonth() {
    this.route.navigate(["/add-month"]);
  }
  //navigate to add-goal page

  addgoal() {
    this.route.navigate(["/add-goal"]);
  }
}
