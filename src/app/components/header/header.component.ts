import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userLoggedin:any;
  userName: any;
  usernameSubscription: Subscription;
  constructor(public dataservice:DataService, private authservice:AuthService){
    this.userLoggedin= this.dataservice.userLoggedIn;
    this.usernameSubscription = this.dataservice.usernameChanged$.subscribe(
      newUsername => {
        this.userName = newUsername;
      }
    );

  }
  logout(){
    this.authservice.logout();
  }
  ngOnInit(): void {
    initFlowbite();
  }

}
