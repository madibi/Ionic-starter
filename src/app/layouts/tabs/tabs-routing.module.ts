import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'pages',
    component: TabsPage,
    children: [
      {
        path: 'triangle',
        loadChildren: () => import('./../../pages/triangle/triangle.module').then(m => m.TriangleModule)
      },
      {
        path: 'circle',
        loadChildren: () => import('./../../pages/circle/circle.module').then(m => m.CircleModule)
      },
      {
        path: 'square',
        loadChildren: () => import('./../../pages/square/square.module').then(m => m.SquareModule)
      },
      {
        path: 'samples',
        loadChildren: () => import('./../../pages/samples/samples.module').then(m => m.SamplesPageModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./../../pages/welcome/welcome.module').then(m => m.WelcomePageModule)
      },
      {
        path: '',
        redirectTo: '/pages/triangle',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/triangle',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
