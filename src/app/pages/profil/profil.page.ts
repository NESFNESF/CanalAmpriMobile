import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../../modals/login/login.component";
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {StorageDBService} from "../../services/storage-db.service";
import {RestApiServiceService} from "../../services/rest-api-service.service";
import {PictureServiceService} from "../../services/picture-service.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  host = "https://mobile.canaletancheite.com/";
  user : any;

  isSend : boolean = false;
  isLoad : boolean = false;

  autoSaveInterval : any;
  constructor(  private alertController: AlertController, public loadingCtrl: LoadingController,private pictureService :PictureServiceService,private restApiService:  RestApiServiceService,private modalCtrl: ModalController,public storageDbService : StorageDBService) {
    this.user = storageDbService.user;
  }

  ngOnInit() {
    this.autoSaveInterval = setInterval(()=>{
      if(this.storageDbService.isLoggedIn()){
        this.update()
      }else{
        clearInterval(this.autoSaveInterval);
      }
    }, 30000);
  }
  async login() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
    });
    modal.present();
  }
  async logout(){
    this.storageDbService.logout();
    this.login();
  }
   async  takePicture(){

    const  picture : any = await this.pictureService.takePicture();
     this.isLoad = true;
     let loading = await this.loadingCtrl.create({
       spinner: 'lines-sharp-small',
       // content: 'Loading Please Wait...'
     });
     loading.present();
    const load = new HttpParams()
      .set("user_id",this.user.user_id)
      .set("profil",picture.base)
      .set('grant_type', 'password');
    this.restApiService.updateUser(load).subscribe( async res => {
      if(res){
        this.storageDbService.user = res.data;
        await this.storageDbService.login(res.data);
        loading.dismiss();
        this.isLoad = true;
      }else {
      }
    },error => {
      loading.dismiss();
      this.isLoad = false;
    });
  }
  update(){
    const load = new HttpParams()
      .set("user_id",this.user.user_id)
      .set('grant_type', 'password');
    this.restApiService.updateUser(load).subscribe( async res => {
      if(res){
        this.storageDbService.user = res.data;
        await this.storageDbService.login(res.data);
      }else {
      }
    },error => {
    });
  }
  async delete(){
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const load = new HttpParams()
      .set("user_id",this.user.user_id)
      .set("profil","delete")
      .set('grant_type', 'password');
    this.restApiService.updateUser(load).subscribe( async res => {
      if(res){
        this.storageDbService.user = res.data;
        await this.storageDbService.login(res.data);
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
