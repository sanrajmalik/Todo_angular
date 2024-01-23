import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userLoggedin:any;
  constructor(public dataservice:DataService, private authservice:AuthService){
    this.userLoggedin= this.dataservice.userLoggedIn;

  }
  logout(){
    this.authservice.logout();
  }

}
