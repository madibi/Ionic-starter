import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'error',
    loadChildren: () => import('./../../_errors/__errors/errors.module')
    .then(m => m.ErrorsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./../../_auth/__auth/auth.module')
    .then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./../tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
