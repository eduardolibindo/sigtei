import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NotificationRoutingModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
        AddEditComponent
    ],
    providers: []
})
export class NotificationModule { }
