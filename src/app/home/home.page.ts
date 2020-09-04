import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, IonContent } from '@ionic/angular';

//Services
import { ExpenseService } from '../services/expense.service';
import { ExpenseModelService } from '../services/expense-model.service';
import { GoalService } from '../services/goal.service';
import { GoalModelService } from '../services/goal-model.service';

// Plugins & Package
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
// import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
	//scroll to top function 
	@ViewChild(IonContent) pageTop: IonContent;

	public pageScroller() {
		this.pageTop.scrollToTop();
	}

	public expenses: any[];
	public loadedExpenses: any[];
	goals: any;
	amount: number;
	public expenseListRef: Observable<ExpenseModelService[]>;
	totalamount: number = 0;
	public goalCollectionRef: Observable<GoalModelService[]>;
	statusMsg: number = 0;
	sampleArr = [];
	resultArr = [];
	totalExps = {};
	expenseId: string;


	//initializing default value for total
	// arr: ExpenseData[] = [];
	// model ={date:'',amount:'',category:'',desc:'',remark:''};
	// ngOnInit(){
	//   this.expenseProvider.getExpenseDetail().subscribe(
	//  (expenses: ExpenseData[]) => {
	//   this.arr = expenses;
	//   console.log(this.arr);
	//  }
	// );

	constructor(
		public navCtrl: NavController,
		public expenseProvider: ExpenseService,
		public goalProvider: GoalService,
		public firestore: AngularFirestore,
		private plt: Platform,
	) {
		expenseProvider.getExpenseDetail().subscribe((data) => {
			this.expenses = this.sortExpensesByDate(data);
			this.totalExps = this.getTotalSpentByBudget(data);
			goalProvider.getGoals().subscribe((data) => {
				this.goals = this.removeExpiredBudget(data);
			});
		});
	}

	//searchBar
	ngOnInit() {
		this.firestore.collection('expenses').valueChanges().subscribe(expenses => {
			this.expenses = this.sortExpensesByDate(expenses);
			this.loadedExpenses = expenses;
		});

		this.expenseListRef = this.expenseProvider.getExpenseList("expenseId").valueChanges();
		this.expenseListRef.subscribe(val => {
			let amountarray: number[] = [];
			val.map((obj) => {
				amountarray.push(obj.amount);
			});
			this.totalamount = amountarray.reduce((a, b) => +a + +b, +0); // prefixing '+' before numbers to sumup
		});
	}

	initializeItems(): void {

		this.expenses = this.loadedExpenses;

	}

	// filter search based on user input 
	filterList(evt) {
		this.initializeItems();

		const searchTerm = evt.srcElement.value;

		if (!searchTerm) {
			return;
		}
		this.expenses = this.expenses.filter(currentExpense => {
			if (currentExpense.desc && searchTerm) {
				if (currentExpense.desc.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
					return true;
				}
				return false;
			}
		})
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

	// remove expired budgets from home page
	removeExpiredBudget(goals) {
		let d = new Date();
		let temp = [];
		for (var i = 0; i < goals.length; i++) {
			let goalsEndDate = new Date(goals[i]["endDate"]);
			if (goalsEndDate >= d) {
				temp.push(goals[i]);
			}
		}
		return temp;
	}

	//sort the transaction so that the latest date transaction will appear at the top 
	sortExpensesByDate(expenses) {
		let temp = expenses.sort((d, e) => ((new Date(e['date']).getTime()) - (new Date(d['date']).getTime())));
		return temp;
		// return expenses;
	}

	setGoal() {
		this.navCtrl.navigateRoot('set-goals');
	}

	goToViewExpense() {
		this.navCtrl.navigateRoot('goals');
	}

	// view expenses that is in the budget
	viewBudgetExpenses(budget) {
		this.navCtrl.navigateForward('budget-expense', {
			state: {
				item: budget
			}
		});
	}

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

	viewGoal(name, amount, startDate, endDate, optional, goal, goals_id) {
		this.navCtrl.navigateForward('update-goal', {
			state: {
				item: {
					name: name, amount: amount, startDate: startDate, endDate: endDate,
					optional: optional, expense: goal, goals_id: goals_id
				}
			}
		});
	}
	deleteGoal(name, amount, startDate, endDate, optional, goal, goals_id) {
		this.navCtrl.navigateForward('delete-goal', {
			state: {
				item: {
					name: name, amount: amount, startDate: startDate, endDate: endDate,
					optional: optional, expense: goal, goals_id: goals_id
				}
			}
		});
	}
}
