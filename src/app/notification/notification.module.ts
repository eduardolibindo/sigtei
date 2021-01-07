import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
// import { NgxPushNotificationService } from 'ngx-push-notification';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NotificationRoutingModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ],
    // providers:[NgxPushNotificationService],
})
export class NotificationModule { }
