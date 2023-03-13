import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {AddWorkComponent} from "../add-work/add-work.component";
import {StorageDBService} from "../../services/storage-db.service";
import {HttpParams} from "@angular/common/http";
import {RestApiServiceService} from "../../services/rest-api-service.service";
import {Network} from "@capacitor/network";
import {Browser} from "@capacitor/browser";

@Component({
  selector: 'app-travaux',
  templateUrl: './travaux.component.html',
  styleUrls: ['./travaux.component.scss'],
})
export class TravauxComponent implements OnInit {
  pet: any;
  user:any;
  works : any = [];
  worksArchive : any = [];
  isLoad : boolean = false;
  autoSaveInterval : any;
  isArchive : boolean = false;
  constructor(private modalCtrl: ModalController,
              private alertController: AlertController,
              public storageDbService : StorageDBService,
              public loadingCtrl: LoadingController,
              private restApiService:  RestApiServiceService) {
    this.pet ="en cours";
  }
  ngOnInit() {
    this.loadUser()
    this.loadWork()
    this.autoSaveInterval = setInterval(()=>{
      if(this.storageDbService.isLoggedIn()){
        this.loadWork2()
      }else{
        clearInterval(this.autoSaveInterval);
      }
    }, 10000);

  }
  check_void(val : any) {
    this.pet = val;
  }
  excel(){
        const openCapacitorSite = async () => {
          await Browser.open({ url: 'https://mobile.canaletancheite.com/activitespdf' });
        };
        openCapacitorSite();
  }
  async  loadUser(){
    this.user =  await  this.storageDbService.get("user");
  }
  filterWork(){
    this.works =  this.storageDbService.works.filter((item:any,index:any) => {
    item.val = index;

      return !item.isFinish
    } );
    console.log( this.works)
    this.worksArchive =  this.storageDbService.works.filter((item:any,index : any) =>{
      item.index = index;
      return item.isFinish
    } )
    console.log( this.worksArchive)
  }
  vueArchive(){
  this.isArchive = !this.isArchive;
  }
  archiver(item:any,index:any){
    const work = new HttpParams()
      .set('user_id',this.user.user_id)
      .set('travail_id',item.travail_id)
      .set('grant_type', 'password');
    this.restApiService.isArchiveWork(work).subscribe( async res => {
      if(res){
        this.loadWork()
      }else {
      }
    },error => {
    });
  }
  async addOrEdit(statut : string, datas:any = []) {
    this.storageDbService.WorkAddOrEdit = { statut : statut , data : datas}
    const modal = await this.modalCtrl.create({
      component: AddWorkComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.loadWork()
    }
  }
  async delete(data:any) {
    const alert = await this.alertController.create({
      header: 'Souhaitez vous définitivement supprimer cette activité ?',
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
  async loadWork2() {
    const status = await Network.getStatus();
    if (status.connected == true) {
      const user = new HttpParams()
        .set("user_id",this.storageDbService.user.user_id)
        .set('grant_type', 'password');
      this.restApiService.loadWork(user).subscribe( async res => {
        if (res) {
          console.log(res)
          if(res.version!=1){
            this.storageDbService.logout()
          }
          await this.storageDbService.set("works", res.data);
          this.storageDbService.works = res.data;
          this.filterWork()
        } else {
        }
      }, error => {
      });
    }else{
      this.storageDbService.works = await this.storageDbService.get("works")
    }
  }
  async loadWork() {
    const isvalid = await this.storageDbService.get("connexion")
    const   date1 : any = new Date(isvalid);
    const  date2 = Date.now();
    let  tmp = date1 - date2;
    tmp = Math.floor(tmp/1000);
    let sec = tmp % 60;
    tmp = Math.floor((tmp-sec)/60);
    let min = tmp % 60;
    tmp = Math.floor((tmp-min)/60);
    let hour = tmp % 24;
    tmp = Math.floor((tmp-hour)/24);
    let day = tmp;
    if(day>7){
      this.storageDbService.logout()
    }
    const status = await Network.getStatus();
    if (status.connected == true){
      this.isLoad = true;
      let loading = await this.loadingCtrl.create({
        spinner: 'lines-sharp-small',
        // content: 'Loading Please Wait...'
      });
      loading.present();
      const user = new HttpParams()
        .set("user_id",this.storageDbService.user.user_id)
        .set('grant_type', 'password');
      this.restApiService.loadWork(user).subscribe( async res => {
        if(res){
          await this.storageDbService.set("works",res.data);
          this.storageDbService.works = res.data;
          this.filterWork()
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
    }else{
      this.storageDbService.works= await this.storageDbService.get("works")
    }
  }
  async deleteData(data:any) {
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const work = new HttpParams()
      .set("user_id",this.user.user_id)
      .set('travail_id',this.storageDbService.works[data].travail_id)
      .set('grant_type', 'password');
    this.restApiService.removeWork(work).subscribe( async res => {
      if(res){
        this.loadWork2()
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
  async  detail(data: any){
    this.storageDbService.Activite = data;
    console.log(data)
  }
}
