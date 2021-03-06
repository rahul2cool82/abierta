import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ServiceApi } from '../services/service.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor( private _service_api: ServiceApi ) { }

  @Output() tokenEvent = new EventEmitter<string>();

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  loginUser($event: any, userName: string, password: string){
    localStorage.removeItem('token');
    $event.preventDefault();
    // tslint:disable-next-line:no-unused-expression
    this._service_api.postLoginAccount({username: userName, password}).
    subscribe( ( data ) => {
      this.tokenEvent.emit(JSON.stringify(data));
    } );
  }

}
