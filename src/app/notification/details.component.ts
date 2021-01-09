import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_services/notification.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', './main.css']
})

export class DetailsComponent implements OnInit {
  notifications: any[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getnotificationAll()
      .pipe(first())
      .subscribe(notifications => this.notifications = notifications);
  }

  deleteNotification(id: string) {
    const notification = this.notifications.find(x => x.id === id);
    notification.isDeleting = true;
    this.notificationService.deleteNotification(id)
      .pipe(first())
      .subscribe(() => {
        this.notifications = this.notifications.filter(x => x.id !== id);
      });
  }
}
