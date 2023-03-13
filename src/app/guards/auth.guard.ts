import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginComponent } from '../modals/login/login.component';
import { StorageDBService } from '../services/storage-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private modalCtrl: ModalController,private storageDbService : StorageDBService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.storageDbService.isLoggedIn()){
      return true;
    }
    this.login()
    return false;
  }
  async login() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
    });
    modal.present();
  }
}
