import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { ServiceApi } from './services/service.login';
import {DashboardModule} from './dashboard/dashboard.module';
import {UserModule} from './user/user.module';
import {ConfigurationModule} from './configuration/configuration.module';
import {JacketModule} from './jacket/jacket.module';

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
  providers: [ ServiceApi ],
  bootstrap: [AppComponent]
})
export class AppModule { }
