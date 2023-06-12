import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modals/login/login.component';
import { RegisterComponent } from './modals/register/register.component';
import {WorkPageModule} from "./pages/work/work.module";
import {ProfilPageModule} from "./pages/profil/profil.module";
import {MessagePageModule} from "./pages/message/message.module";
import {CollaborateursPageModule} from "./pages/collaborateurs/collaborateurs.module";
import {HttpClientModule} from "@angular/common/http";


import { Network } from '@capacitor/network';
import {FormsModule} from "@angular/forms";
import {InAppBrowser} from "@awesome-cordova-plugins/in-app-browser/ngx";

//import {PdfViewerComponent} from "ng2-pdf-viewer";*/

Network.addListener('networkStatusChange', status => {
  if (status.connected == false){
    alert("vérifiez votre connexion svp !");
  }
});



@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    /*    IonicStorageModule.forRoot({
          name: '__mydb',
          driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),*/
    WorkPageModule,
    ProfilPageModule,
    MessagePageModule,
    CollaborateursPageModule
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, InAppBrowser],
  bootstrap: [AppComponent],

})
export class AppModule {}
