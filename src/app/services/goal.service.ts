import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalModelService } from './goal-model.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})

export class GoalService {

	goalsCollectionRef: AngularFirestoreCollection<any>;

	constructor(
		public http: HttpClient,
		public firestore: AngularFirestore
	) {
		this.goalsCollectionRef = this.firestore.collection("goals", x => x.orderBy("endDate", "desc"));
	}

	//add budget to firebase
	addUpdateGoal(name: string, amount: number, startDate: string, endDate: string, optional: string, goals_id: string) {
		this.goalsCollectionRef.doc(name).set({
			name: name,
			amount: amount,
			startDate: startDate,
			endDate: endDate,
			optional: optional,
			goals_id: goals_id
		});
	}

	//delete goal
	deleteGoal(name: string) {
		this.goalsCollectionRef.doc(name).delete();
	}
	//retrieve budget from firebase
	getGoals() {
		return this.goalsCollectionRef.valueChanges();
	}

	getGoalsList(goals: string): AngularFirestoreCollection<GoalModelService> {
		return this.firestore.collection(`goals`);
	}
}
