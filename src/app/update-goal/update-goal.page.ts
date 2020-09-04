import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoalService } from '../services/goal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-update-goal',
	templateUrl: './update-goal.page.html',
	styleUrls: ['./update-goal.page.scss'],
})

export class UpdateGoalPage implements OnInit {

	myGoals: FormGroup;
	public errorMessage: string;
	goal: any;

	constructor(
		public navCtrl: NavController,
		public route: Router,
		public fb: FormBuilder,
		public goalProvider: GoalService
	) {

		if (this.route.getCurrentNavigation().extras.state) {
			this.goal = this.route.getCurrentNavigation().extras.state.item;
		}

		this.myGoals = fb.group({
			'name': this.goal.name,
			'amount': this.goal.amount,
			'startDate': this.goal.startDate,
			'endDate': this.goal.endDate,
			'optional': this.goal.optional
		});
	}

	ngOnInit() {
	}

	//update budget
	clickUpdate() {
		if (this.myGoals.value.name != "") {
			this.goalProvider.addUpdateGoal(this.myGoals.value.name, this.myGoals.value.amount, this.myGoals.value.startDate, this.myGoals.value.endDate, this.myGoals.value.optional, this.goal.expense.goals_id);
			this.navCtrl.pop();
		} else {
			console.log("Budget Name cannot be empty");
		}
	}
}