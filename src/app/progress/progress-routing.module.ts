import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressPage } from './progress.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressPage,
    children: [
      {
        path: 'pie-chart',
        loadChildren: () => import('../pie-chart/pie-chart.module').then( m => m.PieChartPageModule)
      },
      {
        path: 'progress-bar',
        loadChildren: () => import('../progress-bar/progress-bar.module').then( m => m.ProgressBarPageModule)
      },
     
    ]
  
 
 
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressPageRoutingModule {}
