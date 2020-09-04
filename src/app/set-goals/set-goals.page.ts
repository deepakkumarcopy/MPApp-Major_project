import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GoalService } from '../services/goal.service';

@Component({
	selector: 'app-set-goals',
	templateUrl: './set-goals.page.html',
	styleUrls: ['./set-goals.page.scss'],
})

export class SetGoalsPage implements OnInit {

	myGoals: FormGroup;
	msg: string;
	public errorMessage: string;

	constructor(
		public navCtrl: NavController,
		public fb: FormBuilder,
		public goalProvider: GoalService,
		public toastCtrl: ToastController
	) {
		this.myGoals = fb.group({
			'name': new FormControl(null, [Validators.required]),
			'amount': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]),
			'startDate': new FormControl(null, [Validators.required]),
			'endDate': new FormControl(null, [Validators.required]),
			'optional': new FormControl
		})
	}

	ngOnInit() {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SetGoalsPage');
	}

	async clickAdd() {

		//if(!this.myGoals.valid){
		//   console.log("Invalid value");
		//  }
		//this.myGoals.value.startDate = this.formatdmy( this.myGoals.value.startDate);
		// this.myGoals.value.endDate = this.formatdmy(this.myGoals.value.endDate);
		let date = new Date().getTime();

		if (this.myGoals.value.name != " " &&
			this.myGoals.value.amount != "" &&
			this.myGoals.value.startDate != "" &&
			this.myGoals.value.endDate != "" &&
			this.myGoals.value.optional != ""
		) {
			this.goalProvider.addUpdateGoal(this.myGoals.value.name, this.myGoals.value.amount, this.myGoals.value.startDate, this.myGoals.value.endDate, this.myGoals.value.optional, date.toString());
			this.navCtrl.pop();
			const toast = await this.toastCtrl.create({
				message: 'Your goals were successfully added',
				duration: 2000,
			});
			await toast.present();
		} else {
			const toast = await this.toastCtrl.create({
				message: 'Failed to add Goal. Please check your inputs!',
				duration: 2000
			});
			await toast.present();
		}
	}

	clickView() {
		this.navCtrl.navigateForward('goals');
	}
}
