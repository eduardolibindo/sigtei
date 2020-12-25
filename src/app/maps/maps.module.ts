import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { MapService } from '../_services/map.service';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MapsRoutingModule,
        BrowserModule,
        FormsModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyCwiM4LzyXBZGC7Qp1TZZCgFTRd3IAbpvM'})
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ],
    providers:[MapService]
})
export class MapsModule { }
