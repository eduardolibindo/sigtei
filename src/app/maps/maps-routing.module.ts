import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';
import { Role } from '../_models';

import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { MapComponent } from './map/map.component';
import { MapPlacesComponent } from './map-places/map-places.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DetailsComponent },
            { path: 'map', component: MapComponent, canActivate: [AuthGuard], data: { roles: [Role.Estudante, Role.Admin] } },
            { path: 'map-places', component: MapPlacesComponent, canActivate: [AuthGuard], data: { roles: [Role.Motorista, Role.Admin] } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapsRoutingModule { }
