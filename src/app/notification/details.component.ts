import { Component, OnInit } from '@angular/core';
// import { NgxPushNotificationService } from 'ngx-push-notification';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

const ping = `${environment.apiUrl}/notify`;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  constructor(
    // private ngxPushNotificationService: NgxPushNotificationService,
    private http: HttpClient
  ) { }

  ngOnInit() { }

  pingServer(notification) {
    this.http
      .post(ping, notification)
      .subscribe((res) => { });
  }

  // notify() {
  //   this.ngxPushNotificationService.showNotification({
  //     title: 'Ola camarada',
  //     body: 'Fuck you broh',
  //     icon: '../../favicon.ico'
  //   }).subscribe((res: any) => {
  //     if (res.type === 'show') {
  //       console.log('show');
  //     } else if (res.type === 'click') {
  //       console.log('click');
  //     } else {
  //       console.log('close');
  //     }
  //   });
  // }

  notification() {
    this.pingServer(
      {
        title: 'Ola camarada',
        body: 'Fuck you broh',
        icon: '../../favicon.ico'
      }
    );
  }

}
