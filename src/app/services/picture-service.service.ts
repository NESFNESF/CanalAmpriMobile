import { Injectable } from '@angular/core';
import { Camera , CameraOptions, CameraResultType , CameraSource ,Photo } from '@capacitor/camera';
import {Filesystem, Directory, ReadFileOptions} from '@capacitor/filesystem';
//import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import{ Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PictureServiceService {

 // public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;
 // public photo : UserPhoto | undefined;
  //public Ophoto: Photo;
  constructor(platform: Platform) {
    this.platform = platform;
  }
 /* public clear(){
    Storage.remove({
      key: this.PHOTO_STORAGE
    });
  }
*/

  public async takePicture (){
    const image = await Camera.getPhoto({
      quality: 10,
      allowEditing: true,
      source : CameraSource.Camera,
      resultType: CameraResultType.Uri
    });

    const photo = await this.savePicture(image);
    //var imageUrl = image.webPath;

return photo;
  };
  public async takePictureGallery (){
    const image = await Camera.pickImages({
      quality: 10,
      presentationStyle:'fullscreen'
    });

   alert(JSON.stringify(image.photos[0]))
    //const photo = await this.savePicture(image[0]);
    //var imageUrl = image.webPath;
   // return photo;
  };
  private  async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
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
        base : base64Data
      };
    }else{
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
        base : base64Data
      };
    }
  }
  private async readAsBase64(photo: Photo){
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
