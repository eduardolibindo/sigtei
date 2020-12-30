import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';
import { Role } from '../_models';

import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { MapHereComponent } from './map-here/map-here.component';
import { MapHerePlacesComponent } from './map-here-places/map-here-places.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DetailsComponent },
            { path: 'map-here', component: MapHereComponent, canActivate: [AuthGuard], data: { roles: [Role.Estudante, Role.Motorista, Role.Admin] } },
            { path: 'map-here-places', component: MapHerePlacesComponent, canActivate: [AuthGuard], data: { roles: [Role.Motorista, Role.Admin] } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapsHereRoutingModule { }
