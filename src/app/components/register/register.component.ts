import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet,RouterLink, RouterLinkActive,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name:string='';
  password:string='';
  email:string='';
  fieldsEmpty:boolean=false;

  constructor(private authService: AuthService, private toast:ToastrService, private router:Router,private dataService:DataService){

  }

  registerUser(){
    const data={
      name:this.name,
      email:this.email,
      password:this.password
    }
    this.authService.register(data).subscribe((res)=>{
      console.log("User registration successful");
      localStorage.setItem('token',res.token);
      localStorage.setItem('name',res.userName);
      localStorage.setItem('userLoggedIn', "true");
      this.dataService.token=res.token;
      this.dataService.userLoggedIn=true;
      this.dataService.changeUsername(res.userName);
      this.router.navigateByUrl('/dashboard');
    },err=>{
      console.log("User registration failed");
    })
  }
  changeField(){
    if(this.name && this.email && this.password){
      this.fieldsEmpty=true;
    }
    else{
      this.fieldsEmpty=false;
    }
  }
}
