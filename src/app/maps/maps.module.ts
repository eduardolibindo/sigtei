import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { MapPlacesComponent } from './map-places/map-places.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MapsRoutingModule,
        FormsModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyCwiM4LzyXBZGC7Qp1TZZCgFTRd3IAbpvM'})
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
        MapComponent,
        MapPlacesComponent
    ]
})
export class MapsModule { }
