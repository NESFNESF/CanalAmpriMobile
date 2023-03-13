import { StorageDBService } from './../../services/storage-db.service';
import {LoadingController, ModalController, NavController} from '@ionic/angular';
import {Component, OnInit, ViewChild} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {RestApiServiceService} from "../../services/rest-api-service.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {



  nom : any;
  prenom : any;
  telephone : any;
  email: any;
  password : any;

  isSend : boolean = false;
  isLoad : boolean = false;
  @ViewChild('popover') popover : any;
  constructor(private restApiService:  RestApiServiceService,
              private modalCtrl: ModalController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private storageDbService : StorageDBService ) {
  }

  ngOnInit() {}
  sendVoid(){
    if(this.isSend){
      this.nom = null;
      this.prenom = null;
      this.email = null;
      this.telephone = null;
      this.password = null;
      this.isSend = false;
    }

  }

  async register(e: Event) {
    this.popover.event = e;
    this.isLoad = true;
    let loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp-small',
      // content: 'Loading Please Wait...'
    });
    loading.present();
    const user = new HttpParams()
      .set('nom',this.nom)
      .set('prenom',this.prenom)
      .set('email',this.email)
      .set('telephone',this.telephone)
      .set('password',this.password)
      .set('grant_type', 'password');
    this.restApiService.register(user).subscribe( async res => {
      if(res){
        console.log(res)
        const  u = res.data.user;
        const token = res.data.token;
        await this.storageDbService.set("token",token);
        this.storageDbService.token = token;
        await this.storageDbService.login(u);
        await this.storageDbService.set("user",u);
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











  async login() {
    this.modalCtrl.dismiss(null, 'cancel');
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
    });
    modal.present();
  }


}
