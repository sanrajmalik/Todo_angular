import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token:any;
  userLoggedIn:boolean;
  usernameSubject =new Subject<string>();
  usernameChanged$ = this.usernameSubject.asObservable();
  username: string | undefined;

  constructor() {
    this.userLoggedIn= false;
    
     }
     changeUsername(newUsername: string) {
      this.usernameSubject.next(newUsername);
    }
   
}
