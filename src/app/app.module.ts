﻿import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';


import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services/account.service';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { from } from 'rxjs';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from 'angular-weblineindia-qrcode-scanner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PusherService } from './_services/pusher.service';
import { MessagingService } from './_services/messaging.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot([]),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        MatBadgeModule,
        NgxQRCodeModule,
        ZXingScannerModule,
        ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent
],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        PusherService,
        MessagingService,
        AsyncPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
