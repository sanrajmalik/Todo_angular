import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token:any;
  userLoggedIn:boolean;
  userName:any;
  constructor() {
    this.userLoggedIn= false;
   }
   
}
