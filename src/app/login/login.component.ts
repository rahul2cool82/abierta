import { Component, OnInit } from '@angular/core';
import { ServiceApi } from '../services/service.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor( private _service_api: ServiceApi ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  loginUser($event: any, userName: string, password: string){
    $event.preventDefault();
    // tslint:disable-next-line:no-unused-expression
    this._service_api.postLoginAccount({username: userName, password}).
    subscribe( ( data ) => {
      console.log('Login token: %o', data);
    } );
  }

}
