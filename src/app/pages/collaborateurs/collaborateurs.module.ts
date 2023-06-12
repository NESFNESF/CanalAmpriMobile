import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollaborateursPageRoutingModule } from './collaborateurs-routing.module';

import { CollaborateursPage } from './collaborateurs.page';
import {ListCollaborateursComponent} from "../../components/list-collaborateurs/list-collaborateurs.component";
import {AddCollaborateurComponent} from "../../components/add-collaborateur/add-collaborateur.component";
import {FilterUserPipe} from "../../pipes/filter-user.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollaborateursPageRoutingModule,
  ],
  declarations: [CollaborateursPage, ListCollaborateursComponent,AddCollaborateurComponent,FilterUserPipe]
})
export class CollaborateursPageModule {}
