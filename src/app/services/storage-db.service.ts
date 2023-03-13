import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user';
import {BehaviorSubject} from "rxjs";
import {Session} from "inspector";
import {RestApiServiceService} from "./rest-api-service.service";
import {LoadingController} from "@ionic/angular";
import {Network} from "@capacitor/network";
@Injectable({
  providedIn: 'root'
})
export class StorageDBService {
  private _storage: Storage | null = null;
  user : any = null;
  authSubject  =  new  BehaviorSubject(false);
  isAuth : any;
  token : string = "";
  WorkAddOrEdit :any ;
  Activite : any;
  Intervention : any;
  works : any = [];
  colaborateurs : any = [];
  isLoad : boolean = false;
  userOption : any;
  constructor(/*private storage: Storage*/ public loadingCtrl: LoadingController,) {
    this.loadToken()
  }
 isLoggedIn() {

    return  localStorage.getItem("user")
  }
  async loadToken(){
    if(this.isLoggedIn()){
      this.token = await this.get("token")
      this.user = await  this.get("user")



    }
  }
  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    if (status.connected == false){
      alert("vérifiez votre connexion svp !");
    }
    console.log('Network status:', status);
  };

  async init() {
    this.user =await  localStorage.getItem("user")
   // if(this.isAuth){
        //const storage =  await this.storage.create();
      //  this._storage = storage;
       //await this._storage.set("app","CANAL AMPRI")
    //   const app = await this.get("app");
    //   this.isAuth = false;
   //   localStorage.setItem("isAuth",JSON.stringify(true));
  //  }else{
      // this.user = await this.get("user");
      /* if(this.user){
        console.log("ok")
        this.isAuth = true;
       }*/
    //   this.isAuth = JSON.parse(this.isAuth)
  //  }
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async set(key: string, value: any) {
    //await this._storage?.set(key, value);
    await localStorage.setItem(key, JSON.stringify(value) )
  }
  async get(key :string){
   // return await this._storage?.get(key);
    const data = await localStorage.getItem(key);
    // @ts-ignore
    return   JSON.parse(data) ;
  }
  async login(user :any){
  //  this.storage.set;
    this.isAuth = true;
    await localStorage.setItem("user", JSON.stringify(user))
    this.user = user;
    await  localStorage.setItem("conexion",Date.now().toString())
    this.loadToken()
  }
  async  logout(){
    localStorage.clear();
    this.isAuth = false;
    this.authSubject.next(false);
  }
}
