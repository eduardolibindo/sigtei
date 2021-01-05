import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const SERVER_URL = `${environment.apiUrl}/subscription`;

@Injectable()
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription);
  }
}
