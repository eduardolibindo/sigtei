import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { UpdateComponent } from './update.component';
import { FileComponent } from './file.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProfileRoutingModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
        UpdateComponent,
        FileComponent

    ]
})
export class ProfileModule { }
