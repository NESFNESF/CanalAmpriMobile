import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkPage } from './work.page';
import {ActiviteComponent} from "../../components/activite/activite.component";
import {EnregistrementComponent} from "../../components/enregistrement/enregistrement.component";

const routes: Routes = [
  {
    path: '',
    component: WorkPage
  },
  {
    path: 'activites/:activite_id',
    component : ActiviteComponent
  },
  {
    path: 'activites/:activite_id/enregistrements',
    component : EnregistrementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkPageRoutingModule {}
