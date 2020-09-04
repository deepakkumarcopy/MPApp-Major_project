import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteGoalPageRoutingModule } from './delete-goal-routing.module';

import { DeleteGoalPage } from './delete-goal.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		DeleteGoalPageRoutingModule
	],
	declarations: [DeleteGoalPage]
})

export class DeleteGoalPageModule {}