import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServiceApi} from './services/service.api';
import { deprecateLink } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get( ServiceApi );
    if ( req.url === deprecateLink ){
      return next.handle( req.clone() );
    }
    let tokenizedReq;
    if ( localStorage.getItem( 'token' ) ){
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
          'Content-Type': 'application/json'
        }
      });
    }else {
      tokenizedReq = req.clone();
    }
    // @ts-ignore
    return next.handle(tokenizedReq);
  }
}
