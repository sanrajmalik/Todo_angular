import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenExpiryInterceptor: HttpInterceptorFn = (req, next) => {
  const router =inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error.message === 'Token expired') {
        localStorage.removeItem('token')
        router.navigateByUrl('/login');
      }
      return throwError(error);
    })
  );
};
