import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from './user.class';
import { ServiceApi } from '../services/service.api';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() userType: string | undefined;
  @Input() usersList: any[] = [];
  @Input() token: string | undefined;
  @Input() developmentMode: string | undefined;
  //
  newUser: User | undefined;  // this variable should be used for adding new user
  currentFunctionality = 'showTable';

  dtOptions: DataTables.Settings = {};

  // tslint:disable-next-line:variable-name
  constructor(private _service_api: ServiceApi) {
  }
  //
  ngOnInit(): void {
    this.newUser = new User();
    // @ts-ignore
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength : 8,
      processing : true
    };
    this._service_api.getUserMe( this.token )
      .subscribe( ( data ) => {
        // @ts-ignore
        console.log('User me response : %o', this.data);
      } );
  }
  // tslint:disable-next-line:typedef
  changeFunctionality( functionality: string ){
    this.currentFunctionality = functionality;
  }

  // tslint:disable-next-line:typedef
  hideModule(){
    console.log('Hide Called');
    // @ts-ignore
    setTimeout( () => document.querySelector('.user').classList.remove('select') , 0);
  }

  // tslint:disable-next-line:typedef
  showModule(){
    console.log('Show Called');
    // @ts-ignore
    setTimeout( () => document.querySelector('.user').classList.add('select') , 0);
  }

  // tslint:disable-next-line:typedef
  createAccount($event: any, name: string, userName: string, email: string, password: string, confirmPassword: string, role: string){
    $event.preventDefault();
    // tslint:disable-next-line:max-line-length
    if ( name.length === 0 || name.length === 0 || userName.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0 ){
      return alert('Some Fields are empty');
    }

    if ( password !== confirmPassword ){
      return alert('Password not matches');
    }

    // @ts-ignore
    this.newUser?.name = name;
    // @ts-ignore
    this.newUser?.userName = userName;
    // @ts-ignore
    this.newUser?.email = email;
    // @ts-ignore
    this.newUser?.password = password;
    // @ts-ignore
    this.newUser?.userType = role;

    this._service_api.postCreateAccount(this.newUser)
      .subscribe(
        ( data ) => {
          console.log('Create Response : %o', data);
        }
      );
  }
}
