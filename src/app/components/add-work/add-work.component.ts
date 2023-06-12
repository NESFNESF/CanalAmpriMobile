import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {StorageDBService} from "../../services/storage-db.service";
import {RestApiServiceService} from "../../services/rest-api-service.service";
import {HttpParams} from "@angular/common/http";
import {TravauxComponent} from "../travaux/travaux.component";

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.scss'],
})
export class AddWorkComponent implements OnInit {

  debut : any = "";
  description : any = "";
  user : any = "";
  travail_id :any;
  isSend : boolean = false;
  isLoad : boolean = false;
  numero_devis: any = "";
  object: any = "";
  adresse_client: any = "";
  adresse_batiment: any = "";
  nom_client: any = "";
  prenom_client: any = "";
  contact_client: any = "";
  reference: any = "";
  code_postale: any = "";
  contact_site: any = "";
  ville: any = "";
  WorkAddOrEdit : any;
  type_batiment = [

  ]
  constructor(private modalCtrl: ModalController,
              private storageDBService : StorageDBService,
              private restApiService:  RestApiServiceService,
              public loadingCtrl: LoadingController) {
    this.user = this.storageDBService.user;
    this.WorkAddOrEdit = this.storageDBService.WorkAddOrEdit;
    if(this.WorkAddOrEdit.statut==='edit'){
      this.debut= this.storageDBService.works[this.WorkAddOrEdit.data].debut;
      this.contact_client=  this.storageDBService.works[this.WorkAddOrEdit.data].contact_client;
      this.prenom_client=  this.storageDBService.works[this.WorkAddOrEdit.data].prenom_client;
      this.nom_client=  this.storageDBService.works[this.WorkAddOrEdit.data].nom_client;
      this.adresse_batiment= this.storageDBService.works[this.WorkAddOrEdit.data].adresse_batiment;
      this.adresse_client=  this.storageDBService.works[this.WorkAddOrEdit.data].adresse_client;
      this.object=  this.storageDBService.works[this.WorkAddOrEdit.data].object;
      this.numero_devis=  this.storageDBService.works[this.WorkAddOrEdit.data].numero_devis;
      this.description=  this.storageDBService.works[this.WorkAddOrEdit.data].description;
      this.travail_id =  this.storageDBService.works[this.WorkAddOrEdit.data].travail_id;
      this.reference =this.storageDBService.works[this.WorkAddOrEdit.data].reference;
      this.code_postale = this.storageDBService.works[this.WorkAddOrEdit.data].code_postale;
      this.contact_site =this.storageDBService.works[this.WorkAddOrEdit.data].contact_site;
      this.ville= this.storageDBService.works[this.WorkAddOrEdit.data].ville;
    }
  }
  sendVoid(){
    if(this.isSend){
      this.isSend = false;
    }
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
    if(this.WorkAddOrEdit.statut==='edit'){
      const work = new HttpParams()
        .set("user_id",this.user.user_id)
        .set('debut',this.debut)
        .set("contact_client",this.contact_client)
        .set('prenom_client',this.prenom_client)
        .set("nom_client",this.nom_client)
        .set('adresse_batiment',this.adresse_batiment)
        .set("adresse_client",this.adresse_client)
        .set('object',this.object)
        .set("numero_devis",this.numero_devis)
        .set('travail_id',this.travail_id)
        .set('description',this.description)
        .set('reference',this.reference)
        .set("code_postale",this.code_postale)
        .set('contact_site',this.contact_site)
        .set('ville',this.ville)
        .set('grant_type', 'password');
      this.restApiService.editWork(work).subscribe( async res => {
        if(res){
          console.log(res)
          // let works = await this.storageDBService.get("works");
          //works.push(res.data);
          // this.storageDBService.set("works",works);
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
    }else {
      const work = new HttpParams()
        .set("user_id",this.user.user_id)
        .set('debut',this.debut)
        .set("contact_client",this.contact_client)
        .set('prenom_client',this.prenom_client)
        .set("nom_client",this.nom_client)
        .set('adresse_batiment',this.adresse_batiment)
        .set("adresse_client",this.adresse_client)
        .set('object',this.object)
        .set("numero_devis",this.numero_devis)
        .set('description',this.description)
        .set('reference',this.reference)
        .set("code_postale",this.code_postale)
        .set('contact_site',this.contact_site)
        .set('ville',this.ville)
        .set('grant_type', 'password');
      this.restApiService.addWork(work).subscribe( async res => {
        if(res){
          console.log(res)
          // let works = await this.storageDBService.get("works");
          //works.push(res.data);
          // this.storageDBService.set("works",works);
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
  }
}
