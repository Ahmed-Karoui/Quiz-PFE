import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import * as uuid from 'uuid';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Username: string = 'Dummy';

  form: FormGroup = this._formBuilder.group({
    username: ['John Doe'],
  });

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _localStore: StorageService
  ) {}

  ngOnInit() {
    sessionStorage[this.Username] = 'sanoj';
  }

  submit() {
    if (this.form.valid) {
      const guid = uuid.v4();
      this._localStore.sessionId = guid;
      this._localStore.sessionUsername = this.form.get('username').value;
      this._router.navigate(['/quiz']);
    }
  }
}
