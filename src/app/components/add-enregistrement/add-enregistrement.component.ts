import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {PictureServiceService} from "../../services/picture-service.service";
import {HttpParams} from "@angular/common/http";
import {StorageDBService} from "../../services/storage-db.service";
import {RestApiServiceService} from "../../services/rest-api-service.service";
@Component({
  selector: 'app-add-enregistrement',
  templateUrl: './add-enregistrement.component.html',
  styleUrls: ['./add-enregistrement.component.scss'],
})
export class AddEnregistrementComponent implements OnInit {
  pictures = Array();
  titre : any = "";
  description : any = "";
  user : any = "";
  photos : any =[];
  intervention : any;
  isSend : boolean = false;
  isLoad : boolean = false;
  constructor(private modalCtrl: ModalController , private pictureService :PictureServiceService,
              private storageDBService : StorageDBService,
              private restApiService:  RestApiServiceService,
              public loadingCtrl: LoadingController) {
    this.intervention = this.storageDBService.Intervention;
    this.user = this.storageDBService.user;
  }
  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const load = new HttpParams()
      .set("user_id",this.user.user_id)
      .set("titre",this.titre)
      .set('medias',JSON.stringify(this.pictures))
      .set('intervention_id',this.storageDBService.works[this.storageDBService.Activite].interventions[this.storageDBService.Intervention].intervention_id)
      .set('description',this.description)
      .set('grant_type', 'password');
    this.restApiService.addLoad(load).subscribe( async res => {
      if(res){
        loading.dismiss();
        this.modalCtrl.dismiss(true, 'confirm');
        this.isLoad = false;
      }else {
        this.isSend = true;
        loading.dismiss();
        this.isLoad = false;
      }
    },error => {
      this.isSend = true;
      loading.dismiss();
      this.isLoad = false;
    });
  }
  async add() {
    const picture = await this.pictureService.takePicture();
    this.pictures.push(picture);
    if(picture.webviewPath){
      this.photos.push(picture.webviewPath)
    }

  }

  delete(i:any){
    this.pictures.splice(i,1);
  }

}
