import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User} from '../user/user.class';

@Injectable()
export class ServiceApi{
  constructor(private httpClient: HttpClient) {
  }
  // tslint:disable-next-line:typedef
  postCreateAccount(user: User | undefined){
    return this.httpClient.post( '', user);
  }
  // tslint:disable-next-line:typedef
  postLoginAccount(user: any){
    console.log(user);
    return this.httpClient.post( 'http://localhost:8762/users/signin', user );
  }
}
