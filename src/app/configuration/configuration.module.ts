import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [ConfigurationComponent],
    exports: [
        ConfigurationComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationModule { }
