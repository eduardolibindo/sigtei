import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PlacesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class PlacesModule { }
