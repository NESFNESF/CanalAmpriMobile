import {Component, ViewChild} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageDBService } from './services/storage-db.service';
import {Network} from "@capacitor/network";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('popover') popover: { event: Event; } | undefined;

  isOpen = false;

  constructor(private modalCtrl: ModalController,private storageDbService : StorageDBService) {
    this.storageDbService.init()
   // this.logCurrentNetworkStatus();
  }


/*   logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    if (status.connected == false){
      alert("vérifiez votre connexion svp !");
    }

    console.log('Network status:', status);
  };*/


}
