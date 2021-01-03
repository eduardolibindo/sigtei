import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StudentlistRoutingModule } from './student-list-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { DemoMaterialModule } from './material-module';


@NgModule({
  imports: [
    DemoMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    StudentlistRoutingModule,
    FormsModule
  ],
  declarations: [
    LayoutComponent,
    DetailsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentlistModule { }
