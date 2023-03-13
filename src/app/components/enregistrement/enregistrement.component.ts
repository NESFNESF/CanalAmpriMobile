import { Component, OnInit } from '@angular/core';
import {AddEnregistrementComponent} from "../add-enregistrement/add-enregistrement.component";
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {StorageDBService} from "../../services/storage-db.service";
import {Router} from "@angular/router";
import {RestApiServiceService} from "../../services/rest-api-service.service";
import {PdfServiceService} from "../../services/pdf-service.service";
import { Browser } from '@capacitor/browser';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-enregistrement',
  templateUrl: './enregistrement.component.html',
  styleUrls: ['./enregistrement.component.scss'],
})
export class EnregistrementComponent implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  host = "https://mobile.canaletancheite.com/";
 // host = "http://localhost:8000/"
  intervention : any;
  user : any;

  isSend : boolean = false;
  isLoad : boolean = false;
  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              public storageDbService : StorageDBService,
              private router: Router,
              private storageDBService : StorageDBService,
              private restApiService:  RestApiServiceService,
              public loadingCtrl: LoadingController,
              private pdfServiceService :PdfServiceService,
              private iab: InAppBrowser) {
    this.intervention = this.storageDbService.Intervention;
    this.user = this.storageDbService.user;
  }

  loadImage(val:any){
    const openCapacitorSite = async () => {
      await Browser.open({ url: val });
    };
    openCapacitorSite();
  }
  ngOnInit() {}
  async add() {
    const modal = await this.modalCtrl.create({
      component: AddEnregistrementComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }
  async delete(data : any) {
    const alert = await this.alertController.create({
      header: 'Souhaitez vous définitivement supprimer cet enregistrement ?',
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
  this.deleteData(data)
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async deleteData(data:any) {
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const load = new HttpParams()
      .set("user_id",this.user.user_id)
      .set('enregistrement_id',this.storageDbService.works[this.storageDbService.Activite].interventions[this.storageDbService.Intervention].enregistrements[data].enregistrement_id)
      .set('grant_type', 'password');
    this.restApiService.removeLoad(load).subscribe( async res => {
      if(res){
        loading.dismiss();
        this.isLoad = true;
      }else {
        loading.dismiss();
        this.isLoad = false;
      }
    },error => {
      loading.dismiss();
      this.isLoad = false;
    });
  }

}
