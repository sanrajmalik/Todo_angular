import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: any;
  password: any;
 
   constructor(private authService: AuthService, private toast:ToastrService, private router:Router,private dataService:DataService){

   }

   login(){
    this.authService.login(this.email, this.password).subscribe((res)=>{
      localStorage.setItem('token',res.token);
      localStorage.setItem('userLoggedIn', "true");
      this.dataService.token=res.token;
      this.dataService.userLoggedIn=true;
      this.dataService.userName=res.userName
      localStorage.setItem('name',res.userName);
      ;
      this.router.navigateByUrl('/dashboard');
    this.toast.success("Login Success")
    },err=>{
      this.toast.error(err.error.error)
      console.log(err.message)
    })
   }
   
}
