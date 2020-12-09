import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IDstudentcheckinRoutingModule } from './ID-student-checkin-routing.module';
import { LayoutComponent } from './layout.component';

import { ZXingScannerModule } from 'angular-weblineindia-qrcode-scanner';
import { DetailsComponent } from './details.component';
import { ScanComponent } from './scan/scan.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IDstudentcheckinRoutingModule,
        ZXingScannerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatTooltipModule,
        MatIconModule,
        MatListModule

    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
        ScanComponent,
        FormatsDialogComponent,
    ]
})
export class IDstudentcheckinModule { }
