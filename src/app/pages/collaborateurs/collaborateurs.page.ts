import { Component, OnInit } from '@angular/core';
import {StorageDBService} from "../../services/storage-db.service";

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.page.html',
  styleUrls: ['./collaborateurs.page.scss'],
})
export class CollaborateursPage implements OnInit {

  constructor(    public storageDbService : StorageDBService) { }
  ngOnInit() {
  }
}
