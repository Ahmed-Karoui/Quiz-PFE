import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss'],
})
export class MasterLayoutComponent implements OnInit {
  Username: string;
  constructor(private _router: Router, private _localStore: StorageService) {
    this.Username = this._localStore.sessionUsername;
  }
  ngOnInit() {}

  logout() {
    this._localStore.deleteSession();
    this._router.navigate(['']);
  }
}
