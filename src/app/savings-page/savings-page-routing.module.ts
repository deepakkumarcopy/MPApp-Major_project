import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavingsPagePage } from './savings-page.page';

const routes: Routes = [
  {
    path: '',
    component: SavingsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavingsPagePageRoutingModule {}
