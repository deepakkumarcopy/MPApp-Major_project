import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageResolver } from './profile.resolver';
import { ProfilePageGuard } from './profile-can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: {
      data: ProfilePageResolver
    },
    canActivate: [ProfilePageGuard],
    // children: [
    //   {
    //     path: 'profile',
    //     redirectTo: '/profile',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'expenses',
    //     loadChildren: () => import('../expenses/expenses.module').then(m => m.ExpensesPageModule)
    //   },
    // ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfilePage],
  providers: [ProfilePageResolver, ProfilePageGuard]
})
export class ProfilePageModule {}
