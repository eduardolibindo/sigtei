import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { DetailsComponent } from './details.component';

const routes: Routes = [
    { path: '', component: ListComponent }
    // { path: 'details', component: DetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilesRoutingModule { }
