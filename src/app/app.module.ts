import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { ServiceApi } from './services/service.api';
import {DashboardModule} from './dashboard/dashboard.module';
import {UserModule} from './user/user.module';
import {ConfigurationModule} from './configuration/configuration.module';
import {JacketModule} from './jacket/jacket.module';
import {TokenInterceptorService} from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    DashboardModule,
    UserModule,
    ConfigurationModule,
    JacketModule
  ],
  providers: [ ServiceApi, [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }] ],
  bootstrap: [AppComponent]
})
export class AppModule { }
