import { Component, OnInit } from "@angular/core";
import { FirebaseAuthService } from "../firebase-auth.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
})
export class DetailsPage implements OnInit {
  detailsList = [];
  constructor(private authService: FirebaseAuthService) {}

  ngOnInit() {
    this.detailsList = this.authService.detailList;
  }
}
