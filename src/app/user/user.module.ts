import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ServiceApi} from '../services/service.api';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from '../token-interceptor.service';



// @ts-ignore
// @ts-ignore
@NgModule({
    declarations: [UserComponent],
    exports: [
        UserComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule
  ],
  providers: []
})
export class UserModule { }
