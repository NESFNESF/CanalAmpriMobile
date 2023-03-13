import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'work',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./../pages/work/work.module').then( m => m.WorkPageModule)
      },
      {
        path: 'collaborateurs',
        loadChildren: () => import('./../pages/collaborateurs/collaborateurs.module').then( m => m.CollaborateursPageModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./../pages/message/message.module').then( m => m.MessagePageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./../pages/profil/profil.module').then( m => m.ProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/work/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/work/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
