import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {FormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";



@NgModule({
    declarations: [UserComponent],
    exports: [
        UserComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule
  ]
})
export class UserModule { }
