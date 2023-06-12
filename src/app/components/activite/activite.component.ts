import { Component, OnInit } from '@angular/core';
import {AddWorkComponent} from "../add-work/add-work.component";
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {StorageDBService} from "../../services/storage-db.service";
import {Router} from "@angular/router";
import {RestApiServiceService} from "../../services/rest-api-service.service";
import {HttpParams} from "@angular/common/http";
import {PdfServiceService} from "../../services/pdf-service.service";
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss'],
})
export class ActiviteComponent implements OnInit {

  Activite : any;
  isSend : boolean = false;
  isLoad : boolean = false;
  user : any;
  employers : any = [];
  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              public storageDbService : StorageDBService,
              private router: Router,
              private pdfServiceService :PdfServiceService,
              private storageDBService : StorageDBService,
              private restApiService:  RestApiServiceService,
              public loadingCtrl: LoadingController) {
    this.user = this.storageDBService.user;
  }

  ngOnInit() {
    this.Activite = this.storageDbService.Activite;
    if(this.storageDbService.user.role.role_id==2){
      this.employers =this.storageDbService.works[this.Activite].interventions.filter((item:any)=>{
        if(!item.person){
          return false;
        }
        return item.person.user_id==this.storageDbService.user.user_id;
      });
    }
  }


  async add(val : any) {
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const intervention = new HttpParams()
      .set("user_id",this.user.user_id)
      .set('travail_id', this.storageDbService.works[this.storageDbService.Activite].travail_id)
      .set('description', val)
      .set('grant_type', 'password');
    this.restApiService.addIntervention(intervention).subscribe( async res => {
      if(res){
        //this.storageDbService.works[this.storageDbService.Activite].interventions.push(res.data);
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

  navigateToLoad(datas : any){
    this.storageDbService.Intervention = datas;
    this.router.navigate(['/work/home/activites/'+this.storageDbService.works[this.storageDbService.Activite].travail_id +'/enregistrements'])
  }

  async delete(data:any) {
    const alert = await this.alertController.create({
      header: 'Souhaitez vous définitivement supprimer cette intervention ?',
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
            this.deleteData(data);
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  pdf(activite:any,intervention:any){
    const openCapacitorSite = async () => {
      await Browser.open({ url: 'https://mobile.canaletancheite.com/load/'+activite+'/'+intervention });
    };
    openCapacitorSite();
  }
  async deleteData(data:any) {
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const intervention = new HttpParams()
      .set("user_id",this.user.user_id)
      .set('intervention_id',this.storageDbService.works[this.storageDbService.Activite].interventions[data].intervention_id)
      .set('grant_type', 'password');
    this.restApiService.removeIntervention(intervention).subscribe( async res => {
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


  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Type d'intervention" ,
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
      inputs: [
        {
          label: 'RAPPORT D\'INTERVENTION',
          type: 'radio',
          value: 'RAPPORT D\'INTERVENTION',
        }
      ],
    });
    await alert.present();
    const {data,role} = await alert.onDidDismiss();
    const val = data.values;
    if(role=='confirm'){
     if(val){
       this.add(val)
     }
    }
  }
}
