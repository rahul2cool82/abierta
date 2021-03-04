import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JacketComponent } from './jacket.component';



@NgModule({
    declarations: [JacketComponent],
    exports: [
        JacketComponent
    ],
    imports: [
        CommonModule
    ]
})
export class JacketModule { }
