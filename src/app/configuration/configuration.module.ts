import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';



@NgModule({
    declarations: [ConfigurationComponent],
    exports: [
        ConfigurationComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ConfigurationModule { }
