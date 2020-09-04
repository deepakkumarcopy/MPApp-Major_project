import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSavingsPage } from './add-savings.page';

const routes: Routes = [
  {
    path: '',
    component: AddSavingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSavingsPageRoutingModule {}
