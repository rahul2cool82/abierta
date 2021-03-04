import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
    declarations: [DashboardComponent],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class DashboardModule {
}
