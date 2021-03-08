import {Component, ViewChild} from '@angular/core';
import { ServiceApi } from './services/service.api';
import { DashboardComponent } from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {JacketComponent} from './jacket/jacket.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild( DashboardComponent ) dashboardChild: DashboardComponent | undefined;
  @ViewChild( UserComponent ) userChild: UserComponent | undefined;
  @ViewChild( ConfigurationComponent ) configurationChild: ConfigurationComponent | undefined;
  @ViewChild( JacketComponent ) jacketChild: JacketComponent | undefined;

  token = '';
  title = '';
  // tslint:disable-next-line:variable-name
  constructor(private _service_api: ServiceApi) {
    if ( localStorage.getItem( 'token' ) ){
      this.getUserMe();
    }
  }

  // exchangeable variables
  userType = '';
  usersList = [];
  jacketsList = [];
  configurationList = [];
  userID = -1;
  userName = '';
  userEmail = '';
  // global screen variables
  currentScreen = 'login';
  currentModule = '';
  isModuleChanged = true;
  developmentMode = 'test';
  currentDropdown = '';
  currentModuleFunc = -1;
  isAccountDropdown = false;
  // change module function
  // tslint:disable-next-line:typedef
  changeModule( module: string, functionality: string, i: number ){
    const moduleFunctionalities = document.querySelectorAll('.sidebar__moduleDropdown--func');
    if ( this.currentModuleFunc === i ){
      return;
    }
    if ( this.currentScreen !== 'dashboard' ){
      return;
    }
    Array.from( moduleFunctionalities ).forEach( (f) => { f.classList.remove('select'); } );
    this.isModuleChanged = false;
    const sidebarModulesDOM = document.querySelectorAll('.sidebar__module');
    Array.from( sidebarModulesDOM ).forEach( (dom) => { dom.classList.remove('select'); } );

    this.dashboardChild?.hideModule();
    this.userChild?.hideModule();
    this.configurationChild?.hideModule();
    this.jacketChild?.hideModule();

    switch (module){
      case 'dashboard':
        sidebarModulesDOM[0].classList.add('select');
        break;
      case 'user':
        sidebarModulesDOM[1].classList.add('select');
        break;
      case 'configuration':
        sidebarModulesDOM[2].classList.add('select');
        break;
      case 'jacket':
        if ( this.userType === 'u' ){
          sidebarModulesDOM[0].classList.add('select');
          i = 0;
        }else{
          sidebarModulesDOM[3].classList.add('select');
        }
        break;
    }
    // This timeout function helps in transition between two modules
    setTimeout(
      () => {
        this.currentModule = module;
        moduleFunctionalities[i].classList.add( 'select' );
        setTimeout(
          () => {
            switch (module){
              case 'dashboard':
                this.dashboardChild?.showModule();
                break;
              case 'user':
                this.userChild?.showModule();
                this.userChild?.changeFunctionality( functionality );
                break;
              case 'configuration':
                this.configurationChild?.changeFunctionality(functionality);
                this.configurationChild?.showModule();
                break;
              case'jacket':
                this.jacketChild?.changeFunctionality(functionality);
                this.jacketChild?.showModule();
                break;
            }
            this.isModuleChanged = true;
            this.currentModuleFunc = i;
          }, 20
        );
      }, 180
    );

  }

  // if user login then perform some functions
  // tslint:disable-next-line:typedef
  getAllUsers(){
    if ( this.userType === 'u' ){
      return;
    }
  }

  // tslint:disable-next-line:typedef
  getTokenFromLoginScreen( data: string ){
    if ( data === null || data === undefined ) {
      return;
    }
    const jsonData = JSON.parse( data );
    if ( !jsonData.token ){
      // token is unavailable
      return;
    }
    this.token = jsonData.token;
    localStorage.setItem( 'token', this.token );
    this.currentScreen = 'dashboard';

    // now token is available get user me
    this.getUserMe();

  }

  // tslint:disable-next-line:typedef
  showDropdown( dropdown: string ){
    const dropdowns = document.querySelectorAll('.sidebar__moduleDropdown');
    const sidebarModules = document.querySelectorAll('.sidebar__module');
    if ( this.currentDropdown === dropdown ){
      console.log('Ehtegvasdhbfkjasdnnflkasdf');
      Array.from( dropdowns ).forEach( (d) => {
        // @ts-ignore
        d.style.height = 0;
        d.classList.remove('select');
      } );
      Array.from( sidebarModules ).forEach( (m) => { m.classList.remove('select'); } );
      this.currentDropdown = '';
      return;
    }
    Array.from( dropdowns ).forEach( (d) => {
      // @ts-ignore
      d.style.height = 0;
      d.classList.remove('select');
    } );
    Array.from( sidebarModules ).forEach( ( module ) => { module.classList.remove('select'); } );
    let index = 0;
    let sideBarIndex = 0;
    switch ( dropdown ){
      case 'user':
        index = 0;
        sideBarIndex = 1;
        break;
      case 'configuration':
        index = 1;
        sideBarIndex = 2;
        break;
      case 'jacket':
        index = this.userType === 'u' ? 0 : 2;
        sideBarIndex = index + 1;
        break;
      default:
        return;
    }
    // @ts-ignore
    dropdowns[index].style.height = dropdowns[index].scrollHeight + 'px';
    dropdowns[index].classList.add('select');
    sidebarModules[sideBarIndex].classList.add( 'select' );
    this.currentDropdown = dropdown;
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('token');
    this.currentScreen = 'login';
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  getUserMe() {
    this._service_api.getUserMe().subscribe(
      ( data: string | any ) => {
        if ( !data ){
          return;
        }
        console.log(data);
        const dataJson = data;
        this.userID = dataJson.id;
        this.userName = dataJson.username;
        this.userEmail = dataJson.email;
        this.currentScreen = 'dashboard';
        switch ( dataJson.roles[0] ){
          case 'ADMIN':
            this.userType = 'a';
            break;
          case 'USER':
            this.userType = 'u';
            break;
        }
        this.getUsersAll();
        this.getJacketsAll();
        this.getConfigurationAll();
      }
    );
  }

  // tslint:disable-next-line:typedef
  getUsersAll() {
    if ( this.userType === 'u' ){
      return;
    }
    this._service_api.getUsersAll().subscribe(
      ( data: any ) => {
        this.usersList = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getJacketsAll(){
    if ( this.userType === 'u' ){
      return;
    }
    this._service_api.getJacketList().subscribe(
      ( data: any ) => {
        console.log(data);
        this.jacketsList = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getConfigurationAll() {
    if ( this.userType === 'u' ){
      return;
    }
    this._service_api.getConfigurationList().subscribe(
      ( data: any ) => {
        this.configurationList = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  userChildEmitter() {
    this.getUsersAll();
    this.changeModule('user', 'showTable', 0);
  }

  // tslint:disable-next-line:typedef
  configurationChildEmitter() {
    this.getConfigurationAll();
    this.changeModule( 'configuration', 'showTable', 2 );
  }

  // tslint:disable-next-line:typedef
  jacketChildEmitter(){
    this.getJacketsAll();
    this.changeModule( 'jacket', 'showTable', 4 );
  }
}
