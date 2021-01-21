import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list-files/list.component';
import { DetailsComponent } from './list-files/details.component';
import { UploadComponent } from './list-files/upload.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';
import { AttestationFileComponent } from './attestation-file/attestation-file.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'list-files', component: ListComponent },
      // { path: 'upload', component: UploadComponent },
      { path: 'attestation', component: AttestationFileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
