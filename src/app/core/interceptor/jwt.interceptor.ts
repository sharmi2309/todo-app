import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpInterceptorFn, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


export const JwtInterceptor : HttpInterceptorFn =( req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = sessionStorage.getItem('token');
 

    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next(cloned);
    }

    return next(req);
}

