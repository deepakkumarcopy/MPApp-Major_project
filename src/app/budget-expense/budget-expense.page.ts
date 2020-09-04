import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-budget-expense',
	templateUrl: './budget-expense.page.html',
	styleUrls: ['./budget-expense.page.scss'],
})

export class BudgetExpensePage implements OnInit {

	budgetExpenses;
	budgetName: any;
	budget: any;

	constructor(
		public navCtrl: NavController,
		public route: Router,
		private expenseProvider: ExpenseService
	) {
		if (this.route.getCurrentNavigation().extras.state) {
			this.budget = this.route.getCurrentNavigation().extras.state.item;
			console.log(this.budget)
		}
		this.budgetName = this.budget.name;
		expenseProvider.getExpenseDetail().subscribe((data) => {
			let budgetId = this.budget.goals_id;
			this.budgetExpenses = this.filterExpenses(budgetId, data);
		});
	}

	ngOnInit() {
	}

	// filter expenses to retrieve expense from the same id
	filterExpenses(budgetId, expenses) {
		return expenses.filter(d => d['goals_id'] == budgetId);
	}

	//to update and delete of expense 
	viewExpense(date, amount, category, desc, remark, expense, goals_id) {
		this.navCtrl.navigateForward('edit-expense', {
			state: {
				item: {
					date: date,
					amount: amount,
					desc: desc,
					category: category,
					remark: remark,
					expense: expense,
					goals_id: goals_id
				}
			}
		})
	}
}
