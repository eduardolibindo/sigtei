import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/messaging';

const notify = `${environment.apiUrl}/notify`;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  options = {
    title: 'Lokesh',
    body: 'Browser Notification..!',
    icon: '../../favicon.ico'
  };

  constructor(
    private http: HttpClient,
    private afMessaging: AngularFireMessaging
  ) { }

  ngOnInit() { }

  notifyServer(notification) {
    this.http
      .post(notify, notification)
      .subscribe((res) => {});
  }

  sendNodeNotification(notification) {
    this.notifyServer({
      title: notification.title,
      body: notification.body,
      icon: notification.icon
    });
  }

  setNotification() {
    this.sendNodeNotification({title: 'Lokesh', body: 'Browser Notification..!', icon: '../../favicon.ico'});
  }

  requestPushNotificationsPermission() { // requesting permission
    this.afMessaging.requestToken // getting tokens
      .subscribe(
        (token) => { // USER-REQUESTED-TOKEN
          console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          console.error("Permission denied!", error);
        }
      );
  }

}
