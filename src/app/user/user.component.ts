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

  @Output() getNewUserList = new EventEmitter<string>();

  pageIndexes: number[] = [];
  //
  newUser: User | undefined;  // this variable should be used for adding new user
  currentFunctionality = 'showTable';
  currentPageIndex = 0;
  fromIndex = 1;
  toIndex = 0;
  totalIndex = 0;
  // tslint:disable-next-line:variable-name
  constructor(private _service_api: ServiceApi) {
  }
  //
  ngOnInit(): void {
    this.newUser = new User();
    for ( let i = 0 ; i < this.usersList.length ; i++ ){
      this.pageIndexes[i] = i;
      this.totalIndex = this.totalIndex + this.usersList[i].length;
    }
    this.toIndex = (this.usersList === undefined || this.usersList === [] || this.usersList.length <= 0 ) ? 0 : this.usersList[0].length;
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

  // tslint:disable-next-line:typedef
  changeTable( index: number ){
      const tabs = document.querySelectorAll('.user__tableContainer--footerPageIndexes .user__tableContainer--footerPageTab');
      if ( index < 0 || index >= tabs.length ){
        return;
      }
      this.fromIndex = index * 8 + 1;
      this.toIndex = index * 8 + this.usersList[ index ].length;
      Array.from( tabs ).forEach( t => t.classList.remove('select') );
      this.currentPageIndex = index;
      tabs[index].classList.add('select');
  }
  // tslint:disable-next-line:typedef
  checkAllCheckbox(){
    const checkBoxes = document.querySelectorAll('.user__table--checkBox');
    // @ts-ignore
    const val: boolean = checkBoxes[0].checked;
    checkBoxes.forEach( (box) => {
      // @ts-ignore
      box.checked = val;
    } );
  }
  // tslint:disable-next-line:typedef
  uncheckParentCheckbox( index: number ){
    const checkBoxes = document.querySelectorAll('.user__table--checkBox.user');
    // @ts-ignore
    if ( checkBoxes[index].checked === true ){
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0 ; i < checkBoxes.length ; i++ ){
        // @ts-ignore
        if ( checkBoxes[i].checked !== true ){
          // @ts-ignore
          document.querySelectorAll('.user__table--checkBox')[0].checked = false;
          return;
        }
      }
    }else{
      // @ts-ignore
      document.querySelectorAll('.user__table--checkBox')[0].checked = false;
      return;
    }
  }
  // tslint:disable-next-line:typedef
  deleteUser( index: number ){
    const tempUsers = [];
    let tempi = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.usersList.length ; i++){
      // tslint:disable-next-line:prefer-for-of
      for ( let j = 0 ; j < this.usersList[i].length ; j++ ){
          if ( i === this.currentPageIndex && j === index ){
            // dont do anything
          }else {
            tempUsers[tempi] = this.usersList[i][j];
            tempi++;
          }
      }
    }
    tempi = 0;
    let tempj = 0;
    const newUsers: any[] = [];

    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0 ; i < tempUsers.length ; i++){
      if ( tempj === 0 ){
        newUsers[ tempi ] = [];
      }
      const tarray: any[] = newUsers[tempi];
      tarray[tempj] = tempUsers[i];
      newUsers[tempi] = tarray;

      tempj++;
      if ( tempj >= 8 ){
        tempj = 0;
        tempi++;
      }
    }

    this.usersList = newUsers;
    // @ts-ignore
    const newPageIndexes = [];
    this.getNewUserList.emit(JSON.stringify(this.usersList));
    for ( let i = 0 ; i < this.usersList.length ; i++ ){
      newPageIndexes[i] = i;
      this.totalIndex = this.totalIndex + this.usersList[i].length;
    }
    this.pageIndexes = newPageIndexes;
    if ( this.currentPageIndex >= this.usersList.length ){
      this.currentPageIndex--;
    }
    this.changeTable( this.currentPageIndex );
  }
  // tslint:disable-next-line:typedef
  deleteSelectedUser(){
    const tempUsers = [];
    let tempi = 0;
    let tempj = 0;
    const checkBoxes = document.querySelectorAll('.user__table--checkBox.user');
    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0 ; i < this.usersList.length ; i++ ){
      // tslint:disable-next-line:prefer-for-of
      for ( let j = 0 ; j < this.usersList[i].length ; j++ ){
        // @ts-ignore
        if ( i === this.currentPageIndex && checkBoxes[j].checked === true ){
          continue;
        }

        if ( tempj === 0 ){
          tempUsers[tempi] = [];
        }
        const tarray: any[] = tempUsers[tempi];
        // @ts-ignore
        tarray[tempj] = this.usersList[i][j];
        tempUsers[tempi] = tarray;
        tempj++;
        if ( tempj >= 8 ){
          tempi++;
          tempj = 0;
        }
      }
    }
    this.usersList = tempUsers;
    // @ts-ignore
    this.getNewUserList.emit(JSON.stringify(this.usersList));
    this.totalIndex = 0;
    this.currentPageIndex = this.currentPageIndex >= this.usersList.length ? this.currentPageIndex - 1 : this.currentPageIndex;
    const tempIndexes = [];
    this.toIndex = 0;
    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0 ; i < this.usersList.length ; i++ ){
      this.totalIndex += this.usersList[i].length;
      tempIndexes[i] = i;
      if ( this.currentPageIndex <= i ){
        this.toIndex += this.usersList[i].length;
      }
    }
    this.pageIndexes = tempIndexes;
    // @ts-ignore
    document.querySelectorAll('.user__table--checkBox')[0].checked = false;

  }

}
