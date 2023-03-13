import {LoadingController, ModalController, NavController} from '@ionic/angular';
import {Component, OnInit, ViewChild} from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import {StorageDBService} from "../../services/storage-db.service";
import {HttpParams} from "@angular/common/http";
import {RestApiServiceService} from "../../services/rest-api-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  emailOrPhone : any ;
  password : any;
  isSend : boolean = false;
  isLoad : boolean = false;
  @ViewChild('popover') popover : any;
  constructor(private restApiService:  RestApiServiceService,
              private modalCtrl: ModalController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private storageDbService : StorageDBService ) {
    localStorage.clear();
  }
  ngOnInit() {}
  sendVoid(){
    if(this.isSend){
      this.emailOrPhone = null;
      this.password = null;
      this.isSend = false;
    }

  }

  async register() {
    this.modalCtrl.dismiss(null, 'cancel');
    const modal = await this.modalCtrl.create({
      component: RegisterComponent,
    });
    modal.present();
  }


  async login(e: Event) {
    this.popover.event = e;
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const user = new HttpParams()
      .set(this.emailOrPhone.indexOf('@') > -1?'email':'telephone' ,this.emailOrPhone)
      .set('password',this.password)
      .set('grant_type', 'password');
    this.restApiService.login(user).subscribe( async res => {
      if(res){
        console.log(res)
        const  u = res.data.user;
        const token = res.data.token;
        await this.storageDbService.login(u);
        await this.storageDbService.set("token",token);
        this.storageDbService.token = token;
        this.storageDbService.isAuth=true;
        this.navCtrl.navigateForward("/work/home");
        loading.dismiss();
        this.modalCtrl.dismiss(null, 'cancel');
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
