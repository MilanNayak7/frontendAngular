import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

const TOKEN_HEADER = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private login:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //add the jwt token (LocalStorage) request
     let authReq = request;
     const token = this.login.getToken();
     if(token != null){
      authReq = authReq.clone({
        setHeaders:{Authorization :`Bearer ${token}`},
      });
     }  

    return next.handle(authReq);
  }
}

