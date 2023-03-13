import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',canActivate : [AuthGuard] ,
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
/*  {
    path: 'work',
    loadChildren: () => import('./pages/work/work.module').then( m => m.WorkPageModule)
  },
  {
    path: 'collaborateurs',
    loadChildren: () => import('./pages/collaborateurs/collaborateurs.module').then( m => m.CollaborateursPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./pages/profil/profil.module').then( m => m.ProfilPageModule)
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
