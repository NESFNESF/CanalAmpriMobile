import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {HttpParams} from "@angular/common/http";
import {PictureServiceService} from "../../services/picture-service.service";
import {StorageDBService} from "../../services/storage-db.service";
import {RestApiServiceService} from "../../services/rest-api-service.service";

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.scss'],
})
export class AddCollaborateurComponent implements OnInit {

  nom : string = "";
  prenom : string = "";
  email : string = "";
  telephone : string = "";

  isSend : boolean = false;
  isLoad : boolean = false;
  role : any ;
  activites:any = [];


  constructor(private modalCtrl: ModalController,
              public storageDBService : StorageDBService,
              private restApiService:  RestApiServiceService,
              public loadingCtrl: LoadingController) {

    this.role = storageDBService.userOption.role.role_id;
    this.activites = storageDBService.userOption.options.activites

  }

  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  isMark(item:any){
    for(let i=0; i<this.activites.length; i++) {
      if(item.travail_id ==this.activites[i]) {
       return true;
      }
    }
    return  false
  }

  remove(item:any){
    let tab = [];
    for(let i=0; i<this.activites.length; i++) {
      if(item.travail_id !=this.activites[i]) {
       tab.push(this.activites[i])
      }
    }
    this.activites = tab;
  }

  addOr(item:any){
   const val = this.isMark(item);
        if(val){
            this.remove(item);
        }else {
          this.activites.push(item.travail_id)
        }
        console.log(this.activites)
  }

  async confirm() {
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const options = {
      role : this.role,
      activites : this.activites
    }
    const user = new HttpParams()
      .set("user_id",this.storageDBService.userOption.user_id)
      .set('role_id',this.role)
      .set("options",JSON.stringify(options))
      .set('grant_type', 'password');
    this.restApiService.updateUser(user).subscribe( async res => {
      if(res){
        loading.dismiss();
        this.modalCtrl.dismiss("good", 'confirm');
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
}
