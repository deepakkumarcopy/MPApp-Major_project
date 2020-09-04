import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'sign-in',
		loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInPageModule)
	},
	{
		path: 'sign-up',
		loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpPageModule)
	},
	{
		path: '',
		redirectTo: 'intro',
		pathMatch: 'full'
	},
	{
		path: 'intro',
		loadChildren: () => import('./intro/intro.module').then(m => m.IntroPageModule)
	},
	{
		path: 'landing-page',
		loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPagePageModule)
	},
	{
		path: 'add-savings',
		loadChildren: () => import('./add-savings/add-savings.module').then(m => m.AddSavingsPageModule)
	},
	{
		path: 'add-month',
		loadChildren: () => import('./add-month/add-month.module').then(m => m.AddMonthPageModule)
	},
	{
		path: 'add-goal',
		loadChildren: () => import('./add-goal/add-goal.module').then(m => m.AddGoalPageModule)
	},
	{
		path: 'progress',
		loadChildren: () => import('./progress/progress.module').then(m => m.ProgressPageModule)
	},
	{
		path: 'details',
		loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
	},
	{
		path: 'budget-expense',
		loadChildren: () => import('./budget-expense/budget-expense.module').then(m => m.BudgetExpensePageModule)
	},
	{
		path: 'delete-goal',
		loadChildren: () => import('./delete-goal/delete-goal.module').then(m => m.DeleteGoalPageModule)
	},
	{
		path: 'edit-expense',
		loadChildren: () => import('./edit-expense/edit-expense.module').then(m => m.EditExpensePageModule)
	},
	{
		path: 'edit-goal',
		loadChildren: () => import('./edit-goal/edit-goal.module').then(m => m.EditGoalPageModule)
	},
	{
		path: 'goals',
		loadChildren: () => import('./goals/goals.module').then(m => m.GoalsPageModule)
	},
	{
		path: 'set-goals',
		loadChildren: () => import('./set-goals/set-goals.module').then(m => m.SetGoalsPageModule)
	},
	{
		path: 'update-goal',
		loadChildren: () => import('./update-goal/update-goal.module').then(m => m.UpdateGoalPageModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})

export class AppRoutingModule { }