import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { AgmCoreModule, GoogleMapsAPIWrapper  } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MapComponent } from './map/map.component';
import { MapPlacesComponent } from './map-places/map-places.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MapsRoutingModule,
        FormsModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyCwiM4LzyXBZGC7Qp1TZZCgFTRd3IAbpvM',
        libraries: ['places']
      }),
      AgmDirectionModule,
      MatSelectModule,
      MatCheckboxModule,
      MatSlideToggleModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
        MapComponent,
        MapPlacesComponent
    ],
    providers: [
      GoogleMapsAPIWrapper, // <---
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    ]
})
export class MapsModule { }
