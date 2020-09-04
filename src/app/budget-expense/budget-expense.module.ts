import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetExpensePageRoutingModule } from './budget-expense-routing.module';

import { BudgetExpensePage } from './budget-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetExpensePageRoutingModule
  ],
  declarations: [BudgetExpensePage]
})
export class BudgetExpensePageModule {}
