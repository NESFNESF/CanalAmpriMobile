import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, Platform} from "@ionic/angular";
import {PictureServiceService} from "../../services/picture-service.service";
import {HttpParams} from "@angular/common/http";
import {StorageDBService} from "../../services/storage-db.service";
import {RestApiServiceService} from "../../services/rest-api-service.service";
import {Camera, CameraResultType, CameraSource, GalleryPhoto, Photo} from "@capacitor/camera";
import {Directory, Filesystem, ReadFileOptions} from "@capacitor/filesystem";
import {Capacitor} from "@capacitor/core";
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
  constructor(private modalCtrl: ModalController , /*private pictureService :PictureServiceService,*/
             private platform: Platform,
              private storageDBService : StorageDBService,
              private restApiService:  RestApiServiceService,
              public loadingCtrl: LoadingController) {
    this.intervention = this.storageDBService.Intervention;
    this.user = this.storageDBService.user;
  }
  ngOnInit() {
   // this.pictureService.chekPermission();
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  count = 0;
  pictureLoad:any[]=[];
  async confirm2() {

    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    if(this.pictures.length==0){
      loading.dismiss();
      this.confirm();
    }
    for(let i=0;i<this.pictures.length;i++){
      let  formData = new FormData();
      formData.append("file", this.pictures[i].file,this.pictures[i].name);
      const api= await this.restApiService.saveFile(formData).subscribe(  res => {
        if(res){
          this.pictureLoad.push(res.data)
          this.count = this.count +1;
          if(this.count>=this.pictures.length){
            loading.dismiss();
            this.confirm();
          }
        }else {
          this.count = this.count +1;
          if(this.count>=this.pictures.length){
            loading.dismiss();
            this.confirm();
          }
        }
      },error => {
        this.count = this.count +1;
        if(this.count>=this.pictures.length){
          loading.dismiss();
          this.confirm();
        }
      });

    }
  }



  async confirm() {
   // this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const load = new HttpParams()
      .set("user_id",this.user.user_id)
      .set("titre",this.titre)
      .set('medias',JSON.stringify(this.pictureLoad))
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
/*  async add() {
    const picture = await this.pictureService.takePicture();
    this.pictures.push(picture);
/!*    if(picture.webviewPath){
      this.photos.push(picture.webviewPath)
    }*!/
  }*/

  delete(i:any){
    this.pictures.splice(i,1);
  }

  public async takePicture (){
    const image = await Camera.getPhoto({
      quality: 10,
      // allowEditing: true,
      source : CameraSource.Camera,
      resultType: CameraResultType.Uri
    }).then(async data => {
      console.log(data)
      const photo : any = await this.savePicture(data);
      //var imageUrl = image.webPath;
      this.pictures.push(photo);

    });


  };
  public async takePictureGallery (){
    const image = await Camera.pickImages({
      quality: 10,
      presentationStyle:'fullscreen'
    }).then(async data => {
      console.log(data)

      data.photos.forEach(async item=>{
        const photo : any = await this.savePicture(item);
        //var imageUrl = image.webPath;
        this.pictures.push(photo);
      })


    });
  };
  private  async savePicture(photo: Photo |GalleryPhoto) {
    const base64Data = await this.readAsBase64(photo);
    const baseBlob = await this.readAsBlob(photo);
    const fileName = new Date().getTime() + '.jpeg';

    const  savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    if(this.platform.is('hybrid')){
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        base : base64Data,
        file: baseBlob
      };
    }else{
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
        base : base64Data,
        file: baseBlob
      };
    }
  }
  private async readAsBase64(photo: Photo | GalleryPhoto){
    if(this.platform.is('hybrid')){
      const file = await Filesystem.readFile(<ReadFileOptions>{
        path: photo.path
      });
      return file.data;
    }else{
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  private async readAsBlob(photo: Photo | GalleryPhoto){

      const response = await fetch(photo.webPath!);
     return  await response.blob();

  }
  private convertBlobToBase64 = (blob: Blob) => new Promise(
    (resolve,reject) =>{
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload= ()=> {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    }
  );







}
