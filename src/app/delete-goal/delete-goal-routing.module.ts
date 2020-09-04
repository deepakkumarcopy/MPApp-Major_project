import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteGoalPage } from './delete-goal.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteGoalPageRoutingModule {}
