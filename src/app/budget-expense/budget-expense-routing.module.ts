import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetExpensePage } from './budget-expense.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetExpensePageRoutingModule {}
