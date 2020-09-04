import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { FirebaseAuthService } from "../firebase-auth.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-add-goal",
	templateUrl: "./add-goal.page.html",
	styleUrls: ["./add-goal.page.scss"],
})

export class AddGoalPage implements OnInit {
	goal: any;
	amount: number;
	record: {
		timestamp: any;
		amount: number;
		startDate: any;
		targetDate: any;
		monthflag: any;
	};
	startDate: any;
	targetDate: any;

	constructor(
		private route: Router,
		private authService: FirebaseAuthService
	) { }

	ngOnInit() { }
	//saving amount to be saved based on goal
	saveByGoal() {
		this.record = {
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			amount: this.amount,
			startDate: this.startDate,
			targetDate: this.targetDate,
			monthflag: false,
		};
		this.authService
			.create_savings(this.goal, this.record)
			.then((resp) => {
				this.record = {
					timestamp: 0,
					amount: 0,
					startDate: 0,
					targetDate: 0,
					monthflag: true,
				};
			})
			.catch((error) => {
				console.log(error);
			});

		this.route.navigate(["/landing-page/savings"]);
	}
	// create_savings(data);
}
