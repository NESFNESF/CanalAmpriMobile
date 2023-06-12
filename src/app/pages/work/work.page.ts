import { Component, OnInit } from '@angular/core';
import {StorageDBService} from "../../services/storage-db.service";
import {alert} from "ionicons/icons";

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {
 user:any;
  constructor(
    public storageDbService : StorageDBService) {



  }

  ngOnInit() {
  }


}
