import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FilesRoutingModule } from './files-routing.module';
import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FilesRoutingModule,
        MatToolbarModule
    ],
    declarations: [
        ListComponent,
        DetailsComponent
    ]
})
export class FilesModule { }
