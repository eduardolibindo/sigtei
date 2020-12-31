import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';
import { Role } from '../_models';

import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { MapLocationComponent } from './map-location/map-location.component';
import { MapDriverComponent } from './map-driver/map-driver.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DetailsComponent },
            { path: 'map-location', component: MapLocationComponent, canActivate: [AuthGuard], data: { roles: [ Role.Motorista, Role.Admin] } },
            { path: 'map-driver', component: MapDriverComponent, canActivate: [AuthGuard], data: { roles: [Role.Estudante, Role.Motorista, Role.Admin] } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapDriverLocationRoutingModule { }
