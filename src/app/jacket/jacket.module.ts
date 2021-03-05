import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JacketComponent } from './jacket.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [JacketComponent],
    exports: [
        JacketComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class JacketModule { }
