import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  Id: string = 'Id';
  Username: string = 'Username';

  get sessionId(): any {
    return sessionStorage[this.Id] ? sessionStorage[this.Id] : undefined;
  }

  get sessionUsername(): any {
    return sessionStorage[this.Username]
      ? sessionStorage[this.Username]
      : undefined;
  }

  set sessionId(value: any) {
    sessionStorage[this.Id] = value;
  }

  set sessionUsername(value: any) {
    sessionStorage[this.Username] = value;
  }

  deleteSession(): void {
    sessionStorage.removeItem(this.Id);
    sessionStorage.removeItem(this.Username);
  }
}
