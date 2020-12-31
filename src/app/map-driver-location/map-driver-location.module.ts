import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MapDriverLocationRoutingModule } from './map-driver-location-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { AgmCoreModule } from '@agm/core';
import { MapLocationComponent } from './map-location/map-location.component';
import { MapDriverComponent } from './map-driver/map-driver.component';
import { PusherService } from '../_services/pusher.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MapDriverLocationRoutingModule,
        FormsModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyCwiM4LzyXBZGC7Qp1TZZCgFTRd3IAbpvM',
        libraries: ['places', 'geometry']
      }),
      HttpClientModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
        MapLocationComponent,
        MapDriverComponent
    ],
    providers: [PusherService],
})
export class MapDriverLocationModule { }
