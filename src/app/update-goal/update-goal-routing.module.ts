import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateGoalPage } from './update-goal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateGoalPageRoutingModule {}
