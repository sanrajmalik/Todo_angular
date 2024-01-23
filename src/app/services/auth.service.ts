import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiURL = 'http://localhost:3000'
  constructor(private httpclient:HttpClient,private dataservice:DataService,private router:Router) { }

  login(email:string, password:string): Observable<any> {
    const data ={email: email, password: password}
    return this.httpclient.post<any>(this.apiURL+'/auth/login', data);
  }

  register(name:string,email:string, password:string): Observable<any> {
    const data ={name:name,email: email, password: password}
    return this.httpclient.post<any>(this.apiURL+'/auth/register', data);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.setItem('userLoggedIn', "false");
    this.dataservice.userLoggedIn=false;
    this.router.navigateByUrl('/login')
  }
  checkUserLoggedIn(){
    const savedState = localStorage.getItem('userLoggedIn');
    if(savedState =='true'){
      this.dataservice.userLoggedIn=true;
    }
    return savedState === 'true';
  }
}
