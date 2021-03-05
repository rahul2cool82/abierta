import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../user/user.class';


@Injectable()
export class ServiceApi{
  constructor(private httpClient: HttpClient) {
  }
  // tslint:disable-next-line:typedef
  postLoginAccount(user: any){
    return this.httpClient.post( 'http://localhost:7771/users/signin', user );
  }
  // tslint:disable-next-line:typedef
  postCreateAccount(user: User | undefined){
    return this.httpClient.post( '', user);
  }
  // tslint:disable-next-line:typedef
  async getGettingAllUsers(token: any){
    if ( false ){
      return this.httpClient.post( 'http://url_to_be_paste_here', token );
    }
    const f = await fetch('files/demoUsers.json');
    const data = await f.json();
    return data;
  }

  // tslint:disable-next-line:typedef
  getUserMe(token: string | undefined){
    const headers = new HttpHeaders({
      Authorization : 'Bearer ' + token,
      'Content-Type' : 'application/json'
    });
    console.log(headers);
    // @ts-ignore
    return this.httpClient.get( 'http://localhost:7771/users/me', {headers} );
  }
}
