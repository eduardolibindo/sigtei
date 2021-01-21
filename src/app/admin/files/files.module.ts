import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FilesRoutingModule } from './files-routing.module';
import { ListComponent } from './list-files/list.component';
import { DetailsComponent } from './list-files/details.component';
import { UploadComponent } from './list-files/upload.component';
import { DemoMaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { LayoutComponent } from './layout.component';
import { AttestationFileComponent } from './attestation-file/attestation-file.component';

@NgModule({
  imports: [
    DemoMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FilesRoutingModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    ListComponent,
    AttestationFileComponent,
    DetailsComponent,
    UploadComponent,
    OverviewComponent,
    LayoutComponent

  ]
})
export class FilesModule { }
