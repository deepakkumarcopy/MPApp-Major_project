import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { GoalService } from '../services/goal.service';
import * as moment from 'moment';

@Component({
	selector: 'app-add-transaction',
	templateUrl: './add-transaction.page.html',
	styleUrls: ['./add-transaction.page.scss'],
})

export class AddTransactionPage implements OnInit {

	addExpenseForm: FormGroup;
	public errorMessage: string;
	goals: any;
	totalExps: any;
	
	constructor(
		public navCtrl: NavController,
		public fb: FormBuilder,
		public expenseProvider: ExpenseService,
		private goalProvider: GoalService,
		public alertController: AlertController
	) {
		this.addExpenseForm = fb.group({
			'date': new FormControl(null, [Validators.required]),
			'amount': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]),
			'category': new FormControl(null, [Validators.required]),
			'desc': new FormControl(null, [Validators.required]),
			'remark': new FormControl,
			'goal': new FormControl(null, [Validators.required])
	
		})
		expenseProvider.getExpenseDetail().subscribe((data) => {
			this.totalExps = this.getTotalSpentByBudget(data);
			goalProvider.getGoals().subscribe((data) => {
				this.goals = data;
			});
		});
	}
	
	ngOnInit() {
	}

	// checks for expenses that will bust the budget.
	// If bust, it shows the alert on the screen
	checkOverBudget(goals, totalExps, currentExpense) {
		let goal_id = currentExpense.goal_id;
		let amount = currentExpense.amount;
		let selectedGoal = goals.filter(goal => goal.goals_id == goal_id)[0];

		if ((totalExps[goal_id] + amount) > selectedGoal['amount']) {

			this.showAlert(selectedGoal['name'], ((totalExps[goal_id] + amount) - selectedGoal['amount']));
		}

		this.goToViewExpense();
		// this.showAlert();
	}

	//alerts when budget reach 75% and above of budget amt
	reachingBudget(goals, totalExps, currentExpense) {
		let goal_id = currentExpense.goal_id;
		let amount = currentExpense.amount;
		let selectedGoal = goals.filter(goal => goal.goals_id == goal_id)[0];

		if ((totalExps[goal_id] + amount) >= (selectedGoal['amount'] * 0.75) &&
			(totalExps[goal_id] + amount) < (selectedGoal['amount'])) {

			this.reachingAlert(selectedGoal['name'], ((selectedGoal['amount']) - (totalExps[goal_id] + amount)));
		}

		this.goToViewExpense();
		// this.showAlert();
	}

	// The alerts that show on the screen
	async showAlert(nameOfBudget, amount) {
		let alert = await this.alertController.create({
			header: 'Budget Exceeded',
			subHeader: '',
			message: "You have exceeded your " + nameOfBudget + " budget by $" + amount + ".",
			buttons: ['Dismiss']
		});
		await alert.present();
	}

	async reachingAlert(nameOfBudget, amount) {
		let alert = await this.alertController.create({
			header: 'Budget Reaching',
			subHeader: '',
			message: "You are reaching your " + nameOfBudget + " with remaining $" + amount + "." + "A Penny Saved Is a Penny Earned! Watch Your spending as it is about to reach the limit!",
			buttons: ['Dismiss']
		});
		await alert.present();
	}


	// adds up the expenses used up by each budget 
	getTotalSpentByBudget(expenses) {
		let totalExpenses = {};
		for (var i = 0; i < expenses.length; i++) {
			if (totalExpenses[expenses[i].goals_id] == undefined) {
				totalExpenses[expenses[i].goals_id] = 0;
			}
			totalExpenses[expenses[i].goals_id] += parseInt(expenses[i].amount);
		}
		return totalExpenses;
	}

	//when transaction is added, user will be directed to home pg 
	goToViewExpense() {
		this.navCtrl.navigateRoot('tabs');
	}

	//adding of transaction 
	clickAdd() {
		console.log(this.addExpenseForm.value)
		if (this.addExpenseForm.value.date != " " &&
			this.addExpenseForm.value.amount != "" &&
			this.addExpenseForm.value.category != "" &&
			this.addExpenseForm.value.desc != "" &&
			this.addExpenseForm.value.remark != ""
		) {
			this.expenseProvider.addExpense(moment(this.addExpenseForm.value.date).format('YYYY-MM-DD'), this.addExpenseForm.value.amount, this.addExpenseForm.value.category, this.addExpenseForm.value.desc, this.addExpenseForm.value.remark, this.addExpenseForm.value.goal);
			this.checkOverBudget(this.goals, this.totalExps, {
				goal_id: this.addExpenseForm.value.goal,
				amount: parseInt(this.addExpenseForm.value.amount)
			});

			this.reachingBudget(this.goals, this.totalExps, {
				goal_id: this.addExpenseForm.value.goal,
				amount: parseInt(this.addExpenseForm.value.amount)
			});
		}
	}
}
