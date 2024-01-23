import { Injectable, inject } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(AuthService).checkUserLoggedIn();
  const router = inject(Router);
  if (storage==true) {
    return true
  } else {
    router.navigateByUrl('/login')
    return false;
    }
};
