import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSavingsPageRoutingModule } from './add-savings-routing.module';

import { AddSavingsPage } from './add-savings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSavingsPageRoutingModule
  ],
  declarations: [AddSavingsPage]
})
export class AddSavingsPageModule {}
