import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';
import { UploadComponent } from './upload.component';

const routes: Routes = [
  // { path: '', component: DetailsComponent },
  { path: '', component: ListComponent },
  {path: 'upload', component: UploadComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilesRoutingModule { }
