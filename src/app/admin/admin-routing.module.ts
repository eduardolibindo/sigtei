import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const placesModule = () => import('./places/places.module').then(x => x.PlacesModule);
const schedulesModule = () => import('./schedules/schedules.module').then(x => x.SchedulesModule);
const filesModule = () => import('./files/files.module').then(x => x.FilesModule);

const routes: Routes = [
  { path: '', component: SubNavComponent, outlet: 'subnav' },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'accounts', loadChildren: accountsModule },
      { path: 'places', loadChildren: placesModule },
      { path: 'schedules', loadChildren: schedulesModule },
      { path: 'files', loadChildren: filesModule },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
