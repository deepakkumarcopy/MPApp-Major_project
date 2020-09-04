import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPagePage } from './landing-page.page';

const routes: Routes = [
	{
		path: '',
		component: LandingPagePage,
		children: [
			{
				path: 'profile',
				loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
			},
			{
				path: 'savings',
				loadChildren: () => import('../savings-page/savings-page.module').then(m => m.SavingsPagePageModule)
			},
			{
				path: 'statistics',
				loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsPageModule)
			},
			{
				path: 'home',
				loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
			},
			{
				path: 'add-transaction',
				loadChildren: () => import('../add-transaction/add-transaction.module').then(m => m.AddTransactionPageModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})

export class LandingPagePageRoutingModule { }