import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseAuthService } from "../firebase-auth.service";
import {
  AlertController,
  ToastController,
  ActionSheetController,
} from "@ionic/angular";
import * as firebase from "firebase";

@Component({
  selector: "app-savings-page",
  templateUrl: "./savings-page.page.html",
  styleUrls: ["./savings-page.page.scss"],
})
export class SavingsPagePage implements OnInit {
  savingsList = [];
  amountList = {};
  sum: any;
  viewType: any;
  constructor(
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,
    private route: Router,
    private authService: FirebaseAuthService,
    public alertController: AlertController
  ) {}
  //read and display the existing savings
  ngOnInit() {
    this.authService.read_savings().subscribe((data) => {
      this.savingsList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Amount: e.payload.doc.data()["amount"],
        };
      });
    });
  }
  //routing to page add-savings
  addsavings() {
    this.route.navigate(["/add-savings"]);
  }
  //deleting a record from the main page
  RemoveRecord(rowID) {
    this.authService.delete_saving(rowID);
  }
  /*saving the existing records in case the 
  user cancels the updation this function would be called and will have the existing data*/
  EditRecord(record) {
    record.isEdit = true;
    record.Editid = record.id;
    record.EditAmount = record.Amount;
  }
  //updating the record of the firebase
  UpdateRecord(recordRow) {
    let record = {};
    record["amount"] = recordRow.EditAmount;
    // recordRow.id=recordRow.Editid;
    this.authService.update_saving(recordRow.id, record);
    recordRow.isEdit = false;
  }
  //for calling the prompt where user enters description and amount
  savedAmountPrompt(record) {
    this.presentAlertPrompt(record);
  }
  /*calculating the sum i.e. total amount saved till now and 
also generating alert when user saves or exceeds or nears the total amount to be saved*/
  addSavedAmount(record, userDetails) {
    let goalType = "not achieved";
    record.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    this.authService.add_saving_amount(userDetails.id, record).then(() => {
      this.authService.totalSavedAmount(record, userDetails).then((res) => {
        goalType = res;
        if (goalType !== "not achieved") this.presentAlert(goalType);
      });
    });
  }
  //for generating the alert
  async presentAlert(goal) {
    let customAlertObj = {
      cssClass: "my-custom-class",

      message: "This is an alert message.",
      buttons: ["OK"],
    };
    if (goal === "goal achieved")
      customAlertObj.message =
        "Hurray!!! You have achieved your savings goal. Keep it up!!";
    else if (goal === "goal exceeded")
      customAlertObj.message =
        "Woohoo!!! You are on the fire. You have exceeded your savings goal.";
    else if (goal === "nearing the goal")
      customAlertObj.message =
        "Keep it up!! You have completed 80% of the savings goal.Keep Saving..!! ";
    const alert = await this.alertController.create(customAlertObj);
    await alert.present();
  }
  //prompt generation function where user enters description and amount saved in that transaction
  async presentAlertPrompt(userDetails) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Amount Saved",
      inputs: [
        // {
        //   name: "description",
        //   type: "text",
        //   placeholder: "Description",
        // },
        {
          name: "amountSaved",
          type: "number",
          placeholder: "Amount Saved",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Ok",
          handler: (data) => {
            if (data.amountSaved) {
              this.addSavedAmount(data, userDetails);
            } else {
              this.presentToast();
            }
          },
        },
      ],
    });
    await alert.present();
  }
  //calling the pie chart page
  progress(data) {
    this.authService.pieParam = data;
    this.route.navigate(["/progress/pie-chart"]);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Enter both the fields",
      duration: 2000,
    });
    toast.present();
  }
  showAll() {
    this.authService.read_savings().subscribe((data) => {
      this.savingsList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Amount: e.payload.doc.data()["amount"],
        };
      });
    });
  }
  //sorting by timestamp in descending order
  sortDesc() {
    this.authService.sortingDesc().subscribe((data) => {
      this.savingsList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Amount: e.payload.doc.data()["amount"],
        };
      });
    });
  }
  //sorting by timestamp in descending order
  sortAsc() {
    this.authService.sortingAsc().subscribe((data) => {
      this.savingsList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Amount: e.payload.doc.data()["amount"],
        };
      });
    });
  }
  //sorting by amount in descending order
  sortAmtDesc() {
    let unsortedList = [];
    this.authService.getList().then((listObject) => {
      unsortedList = listObject;
      unsortedList.sort((a, b) => {
        return b.amount - a.amount;
      });
      this.savingsList = unsortedList.map((obj) => {
        let savingObj = {
          id: obj.id,
          isEdit: false,
          Amount: obj.amount,
        };
        return savingObj;
      });
    });
  }
  //sorting by amount in ascending order

  sortAmtAsc() {
    let unsortedList = [];
    this.authService.getList().then((listObject) => {
      unsortedList = listObject;
      unsortedList.sort((a, b) => {
        return a.amount - b.amount;
      });
      this.savingsList = unsortedList.map((obj) => {
        let savingObj = {
          id: obj.id,
          isEdit: false,
          Amount: obj.amount,
        };
        return savingObj;
      });
    });
  }
  //showing the sort options and calling respective functions for sorting
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Sort By",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Show All",

          icon: "layers",
          handler: () => {
            this.showAll();
          },
        },
        {
          text: "Sort By Goal",

          icon: "golf",
          handler: () => {
            this.sortDesc();
          },
        },
        {
          text: "Sort By Month",
          icon: "calendar",
          handler: () => {
            this.sortAsc();
          },
        },
        {
          text: "Amount(Decreasing) ",
          icon: "trending-down",
          handler: () => {
            this.sortAmtDesc();
          },
        },
        {
          text: "Amount(Increasing) ",
          icon: "trending-up",

          handler: () => {
            this.sortAmtAsc();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }
}
