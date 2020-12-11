import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { from } from 'rxjs';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ZXingScannerModule } from 'angular-weblineindia-qrcode-scanner';;
import { ServiceWorkerModule } from '@angular/service-worker'


@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
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
        NgxQRCodeModule,
        ZXingScannerModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        UsersComponent,
],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
