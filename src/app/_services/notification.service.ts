import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Notification } from '../_models/notification';

const notificationUrl = `${environment.apiUrl}/notification`;

@Injectable({ providedIn: 'root'})
export class NotificationService {

  private notificationSubject: BehaviorSubject<Notification>;
  public notification: Observable<Notification>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.notificationSubject = new BehaviorSubject<Notification>(null);
    this.notification = this.notificationSubject.asObservable();
  }

  public get notificationValue(): Notification {
    return this.notificationSubject.value;
  }

  getnotificationAll() {
    return this.http.get<Notification[]>(notificationUrl);
  }

  getnotificationById(id: string) {
    return this.http.get<Notification>(`${notificationUrl}/${id}`);
  }

  createNotification(params) {
    return this.http.post(notificationUrl, params);
  }

  updateNotification(id, params) {
    return this.http.put(`${notificationUrl}/${id}`, params)
      .pipe(map((notifications: any) => {
        // atualize a conta atual se ela foi atualizada
          // publicar conta atualizada para assinantes
          notifications = { ...this.notificationValue, ...notifications };
          this.notificationSubject.next(notifications);
          return notifications;
      }));
  }

  deleteNotification(id: string) {
    return this.http.delete(`${notificationUrl}/${id}`);
  }

  deleteListAll() {
    return this.http.delete(notificationUrl);
  }

}
