import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SchedulesRoutingModule,
        MatToolbarModule
    ],
    declarations: [
        ListComponent,
        AddEditComponent
    ]
})
export class SchedulesModule { }
