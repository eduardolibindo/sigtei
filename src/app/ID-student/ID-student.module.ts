import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { IDstudentRoutingModule } from './ID-student-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IDstudentRoutingModule,
        NgxQRCodeModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class IDstudentModule { }
