import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavingsPagePageRoutingModule } from './savings-page-routing.module';

import { SavingsPagePage } from './savings-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavingsPagePageRoutingModule
  ],
  declarations: [SavingsPagePage]
})
export class SavingsPagePageModule {}
