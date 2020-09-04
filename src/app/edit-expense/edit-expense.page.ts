import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-expense',
	templateUrl: './edit-expense.page.html',
	styleUrls: ['./edit-expense.page.scss'],
})

export class EditExpensePage implements OnInit {

	addExpenseForm: FormGroup;
	expenseId: string;
	myGoals: any;

	constructor(
		public navCtrl: NavController,
		public fb: FormBuilder,
		public expenseProvider: ExpenseService,
		public route: Router,
	) {

		if (this.route.getCurrentNavigation().extras.state) {
			this.myGoals = this.route.getCurrentNavigation().extras.state.item;
		}
		this.addExpenseForm = fb.group({
			'date': this.myGoals.date,
			'amount': this.myGoals.amount,
			'category': this.myGoals.category,
			'desc': this.myGoals.desc,
			'remark': this.myGoals.remark,
		});
	}

	ngOnInit() {
	}

	//update of expense
	clickUpdate() {
		if (this.addExpenseForm.value.date != "") {
			this.expenseProvider.UpdateExpense(this.myGoals.expense.expenseId, this.addExpenseForm.value.date, this.addExpenseForm.value.amount, this.addExpenseForm.value.category, this.addExpenseForm.value.desc, this.addExpenseForm.value.remark, this.myGoals.expense.goals_id);
			this.navCtrl.pop();
		}
		else {
			console.log("Date cannot be empty!");
		}
	}

	// delete of expense
	clickDelete() {
		this.expenseProvider.deleteExpense(this.myGoals.expense.expenseId);
		this.navCtrl.pop();
	}
}
