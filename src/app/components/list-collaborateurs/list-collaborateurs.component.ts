import { Component, OnInit } from '@angular/core';
import {AddWorkComponent} from "../add-work/add-work.component";
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {AddCollaborateurComponent} from "../add-collaborateur/add-collaborateur.component";
import {StorageDBService} from "../../services/storage-db.service";
import {RestApiServiceService} from "../../services/rest-api-service.service";
import {Network} from "@capacitor/network";
import {HttpParams} from "@angular/common/http";
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-list-collaborateurs',
  templateUrl: './list-collaborateurs.component.html',
  styleUrls: ['./list-collaborateurs.component.scss'],
})
export class ListCollaborateursComponent implements OnInit {

  isLoad : boolean = false;
  autoSaveInterval : any;
  user : any;
  host = "https://mobile.canaletancheite.com/";
  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              public storageDbService : StorageDBService,
              public loadingCtrl: LoadingController,
              private restApiService:  RestApiServiceService) {
    this.user = this.storageDbService.user;
 }


ngOnInit() {
  this.loadCollaborateurs()
  this.autoSaveInterval = setInterval(()=>{
    if(this.storageDbService.isLoggedIn()){
      this.loadCollaborateurs()
    }else{
      clearInterval(this.autoSaveInterval);
    }
  }, 100000);

}
  async loadCollaborateurs() {
    const status = await Network.getStatus();
    if (status.connected == true) {
      const user = new HttpParams()
        .set("user_id",this.user.user_id)
        .set('grant_type', 'password');
      this.restApiService.allUsers(user).subscribe(async res => {
        if (res) {

          await this.storageDbService.set("colaborateurs", res.data);
          this.storageDbService.colaborateurs = res.data;
        } else {
        }
      }, error => {
      });
    }else{
      await this.storageDbService.get("colaborateurs")
    }
  }
async config(item:any) {
    this.storageDbService.userOption = item;
  const modal = await this.modalCtrl.create({
    component: AddCollaborateurComponent,
  });
  modal.present();
  const { data, role } = await modal.onWillDismiss();

  if(role=="confirm"){
    this.loadCollaborateurs()
  }
}
  excel(){
    const openCapacitorSite = async () => {
      await Browser.open({ url: 'https://mobile.canaletancheite.com/userspdf' });
    };
    openCapacitorSite();
  }
async delete() {
  const alert = await this.alertController.create({
    header: 'Souhaitez vous définitivement supprimer ce compte ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {

        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {

        },
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
}

}
