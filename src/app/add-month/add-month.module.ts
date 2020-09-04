import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMonthPageRoutingModule } from './add-month-routing.module';

import { AddMonthPage } from './add-month.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddMonthPageRoutingModule
	],
	declarations: [AddMonthPage]
})

export class AddMonthPageModule {}