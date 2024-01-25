import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { tokenExpiryInterceptor } from './token-expiry.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),provideToastr({timeOut: 1000, preventDuplicates: true,}),
     provideAnimations(),
    provideHttpClient(withInterceptors([
      tokenInterceptorInterceptor,tokenExpiryInterceptor
    ]))]
};
