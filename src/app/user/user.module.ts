import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [UserComponent],
    exports: [
        UserComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class UserModule { }
