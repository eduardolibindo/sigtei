import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MapsHereRoutingModule } from './maps-here-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { AgmCoreModule, GoogleMapsAPIWrapper  } from '@agm/core';
import { MapHereComponent } from './map-here/map-here.component';
import { MapHerePlacesComponent } from './map-here-places/map-here-places.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MapsHereRoutingModule,
        FormsModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyCwiM4LzyXBZGC7Qp1TZZCgFTRd3IAbpvM',
        libraries: ['places']
      })
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
        MapHereComponent,
        MapHerePlacesComponent
    ],
    providers: [
      GoogleMapsAPIWrapper // <---
    ]
})
export class MapsHereModule { }
