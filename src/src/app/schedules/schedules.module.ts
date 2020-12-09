import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SchedulesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class SchedulesModule { }
