import { Component, OnInit } from "@angular/core";
import { FirebaseAuthService } from "../firebase-auth.service";
import { Router } from "@angular/router";
import * as firebase from "firebase";

@Component({
	selector: "app-add-month",
	templateUrl: "./add-month.page.html",
	styleUrls: ["./add-month.page.scss"],
})

export class AddMonthPage implements OnInit {
	months: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	selectedMonth: any;
	amount: number;
	startDate: any;
	targetDate: any;
	monthList = [];

	// sum=0;
	// record:{'sum':number;'amount':number;};
	record: {
		timestamp: any;
		amount: number;
		startDate: any;
		targetDate: any;
		monthflag: any;
	};
	constructor(
		private route: Router,
		private authService: FirebaseAuthService
	) { }

	ngOnInit() { }
	//get the selected month value which user selected
	getMonth(item) {
		let index = item.detail.value;
		this.selectedMonth = this.months[index];
	}
	//saving amount to be saved based on month
	saveByMonth() {
		this.record = {
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			amount: this.amount,
			startDate: this.startDate,
			targetDate: this.targetDate,
			monthflag: true,
		};
		// this.record.timestamp =  firebase.firestore.FieldValue.serverTimestamp();
		// this.record={'sum':this.sum,'amount':this.amount};

		this.authService
			.create_savings(this.selectedMonth, this.record)
			.then((resp) => {
				this.record = {
					timestamp: 0,
					amount: 0,
					startDate: 0,
					targetDate: 0,
					monthflag: false,
				};
				// this.record={'sum':0,'amount':0};
			})
			.catch((error) => {
				console.log(error);
			});
		this.route.navigate(["/landing-page/savings"]);
	}
}