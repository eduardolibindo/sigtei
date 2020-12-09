import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StudentlistRoutingModule } from './student-list-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StudentlistRoutingModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class StudentlistModule { }
