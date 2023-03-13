import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollaborateursPage } from './collaborateurs.page';

const routes: Routes = [
  {
    path: '',
    component: CollaborateursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaborateursPageRoutingModule {}
