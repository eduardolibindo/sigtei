import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FilesRoutingModule } from './files-routing.module';
import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';
import { UploadComponent } from './upload.component';
import { DemoMaterialModule } from 'src/app/student-list/material-module';

@NgModule({
  imports: [
    DemoMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FilesRoutingModule,
    MatToolbarModule,
    FormsModule,
  ],
  declarations: [
    ListComponent,
    DetailsComponent,
    UploadComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilesModule { }
