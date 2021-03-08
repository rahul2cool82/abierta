import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../user/user.class';
import { serviceAPI } from '../../environments/environment';


@Injectable()
export class ServiceApi{

  // tslint:disable-next-line:typedef
  getToken(){
    return localStorage.getItem('token');
  }
  constructor(private httpClient: HttpClient) {
  }
  // tslint:disable-next-line:typedef
  postLoginAccount(user: any){
    return this.httpClient.post( serviceAPI + '/users/signin', user );
  }
  // tslint:disable-next-line:typedef
  getUserMe(){
    return this.httpClient.get(  serviceAPI + '/users/me' );
  }
  // tslint:disable-next-line:typedef
  getUsersAll(){
    console.log( 'getuSERSaLL()' );
    return this.httpClient.get( serviceAPI + '/users/all' );
  }
  // tslint:disable-next-line:typedef
  getJacketList(){
    return this.httpClient.get( serviceAPI + '/vest/all' );
  }
  // tslint:disable-next-line:typedef
  getConfigurationList(){
    return this.httpClient.get( serviceAPI + '/config/all' );
  }
  // tslint:disable-next-line:typedef
  postCreateAccount( user: any ){
    if ( !user ){
      return;
    }
    const newUser = {
      username: undefined,
      email: undefined,
      password: undefined,
      roles: []
    };
    newUser.username = user.userName;
    newUser.email = user.email;
    newUser.password = user.password;
    // @ts-ignore
    newUser.roles[0] = user.userType === 'a' || user.userType === 'sa' ? 'ADMIN' : 'USER';
    console.log(newUser);
    return this.httpClient.post( serviceAPI + '/users/signup' , newUser);
  }

  // tslint:disable-next-line:typedef
  postConfigurationAdd( configuration: any ){
    return this.httpClient.post( serviceAPI + '/config/add', configuration );
  }
  // tslint:disable-next-line:typedef
  postAddJacket( jacket: any ){
    return this.httpClient.post( serviceAPI + '/vest/add', jacket );
  }

  // tslint:disable-next-line:typedef
  postJacketVerification( jacket: any ){
    return this.httpClient.post( serviceAPI + '/vest/get/rfids', jacket );
  }

  // tslint:disable-next-line:typedef
  getReadAntenna(){
    return this.httpClient.get( serviceAPI + '/barmetrics/allien/read/' );
  }

}
