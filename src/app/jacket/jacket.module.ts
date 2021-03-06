import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JacketComponent } from './jacket.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';



@NgModule({
    declarations: [JacketComponent],
    exports: [
        JacketComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DataTablesModule
    ]
})
export class JacketModule { }
