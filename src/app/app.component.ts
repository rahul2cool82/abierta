import {Component, Output, EventEmitter, ViewChild} from '@angular/core';
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
  @ViewChild( UserComponent ) userChild: DashboardComponent | undefined;
  @ViewChild( ConfigurationComponent ) configurationChild: ConfigurationComponent | undefined;
  @ViewChild( JacketComponent ) jacketChild: JacketComponent | undefined;

  token: undefined;
  // tslint:disable-next-line:variable-name
  constructor(private _service_api: ServiceApi) {
    this.getAllUsers();
  }

  // exchangeable variables
  userType = 'sa';
  usersList = [];
  // global screen variables
  currentScreen = 'login';
  currentModule = '';
  isModuleChanged = true;
  developmentMode = 't';
  // change module function
  // tslint:disable-next-line:typedef
  changeModule( module: string ){
    if ( !this.isModuleChanged ){
      return;
    }
    console.log('idhr : %s', module);
    if ( this.currentScreen !== 'dashboard' ){
      return;
    }
    if ( module === this.currentModule ){
      return;
    }
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
        sidebarModulesDOM[3].classList.add('select');
        break;
    }
    // This timeout function helps in transition between two modules
    setTimeout(
      () => {
        this.currentModule = module;
        setTimeout(
          () => {
            switch (module){
              case 'dashboard':
                this.dashboardChild?.showModule();
                break;
              case 'user':
                this.userChild?.showModule();
                break;
              case 'configuration':
                this.configurationChild?.showModule();
                break;
              case'jacket':
                this.jacketChild?.showModule();
                break;
            }
            this.isModuleChanged = true;
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
    this._service_api.getGettingAllUsers(this.token)
      .then( ( data ) => {
        this.usersList = data;
      } );
  }

  // tslint:disable-next-line:typedef
  getNewUserList( data: string ){
    const jsonData = JSON.parse( data );
    this.usersList = jsonData;
  }
  // tslint:disable-next-line:typedef
  getTokenFromLoginScreen( data: string ){
    if ( data === null || data === undefined ) {
      return;
    }
    const jsonData = JSON.parse( data );
    this.token = jsonData.token;
    console.log('Token after login: %s', this.token);
    this.currentScreen = 'dashboard';
  }
}
