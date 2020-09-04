import { Component, OnInit, Input } from "@angular/core";
import { FirebaseAuthService } from "../firebase-auth.service";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.page.html",
  styleUrls: ["./progress-bar.page.scss"],
})
export class ProgressBarPage implements OnInit {
  // public progress = 1;
  data: any;
  progress: number;
  sum = 0;
  text: string;
  savingsList = [];
  leftAmount = 0;

  amount: number;
  constructor(private authService: FirebaseAuthService) {}
  //getting data from previous pages on initialization
  ngOnInit() {
    this.data = this.authService.pieParam;
    this.amount = this.data.Amount;
    this.authService.read_saving_by_month(this.data).subscribe((data) => {
      this.savingsList = data.map((e) => {
        return e.payload.doc.data()["amountSaved"];
      });

      this.createProgressbar();
    });
  }

  //function for calculating progress % and using it in a progress bar
  createProgressbar() {
    for (let i in this.savingsList) {
      this.sum = this.sum + +this.savingsList[i];
    }
    this.progress = (this.sum / this.amount) * 100;
    if (this.sum > this.amount) {
      this.leftAmount = this.sum - this.amount;
      this.text =
        "Excellent..!! You have exceeeded your saving amount by: " +
        this.leftAmount;
    } else {
      this.leftAmount = this.amount - this.sum;
      this.text = "Left with " + this.leftAmount + " to save. Hurry up now!!";
    }
  }
}
