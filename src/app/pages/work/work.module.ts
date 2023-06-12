import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkPageRoutingModule } from './work-routing.module';

import { WorkPage } from './work.page';
import {TravauxComponent} from "../../components/travaux/travaux.component";
import {AddWorkComponent} from "../../components/add-work/add-work.component";
import {ActiviteComponent} from "../../components/activite/activite.component";
import {EnregistrementComponent} from "../../components/enregistrement/enregistrement.component";
import {AddEnregistrementComponent} from "../../components/add-enregistrement/add-enregistrement.component";
import {PdfViewerComponent} from "ng2-pdf-viewer";
import {FilterWorkPipe} from "../../pipes/filter-work.pipe";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkPageRoutingModule,
  ],

  declarations: [FilterWorkPipe,WorkPage, TravauxComponent,AddWorkComponent,ActiviteComponent,EnregistrementComponent,AddEnregistrementComponent]
})
export class WorkPageModule {}
