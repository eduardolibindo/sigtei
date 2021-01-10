import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './_services';
import { Account, Role } from './_models';
import { SwPush } from '@angular/service-worker';
import { PusherService } from './_services/pusher.service';
import { MessagingService } from './_services/messaging.service';
import { NotificationService } from './_services/notification.service';
import { first } from 'rxjs/operators';

declare var jQuery: any;

const VAPID_PUBLIC = 'BKqOvOXQusxAXzOiRd9_v9aBuQln1CwnnpShklyLvf4BvWIAniKwIC-0M8T2R2XKxc3_QZiDC2OnF1I_NHIPIro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sigtei';
  Role = Role;
  account: Account;

  options: any = {};

  titulo: string;
  corpo: string;
  data: string;

  notifications: any[];

  message;

  constructor(
    private router: Router,
    private accountService: AccountService,
    public swPush: SwPush,
    private pusher: PusherService,
    private messagingService: MessagingService,
    private notificationService: NotificationService
  ) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  ngOnInit() {
    const channel = this.pusher.init1();
    channel.bind('notify', (notification) => {
      this.titulo = notification.title;
      this.corpo = notification.body;

      this.options = {
        ...notification
      };

      this.data = JSON.stringify(this.options);

    });

    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.notificationService.getnotificationAll()
      .pipe(first())
      .subscribe(notifications => this.notifications = notifications);

    // (function ($) {
    //   $(document).ready(function () {
    //     $('.toast').toast('show');
    //   });
    // })(jQuery);
  }

  myFunction() {
    // Get the snackbar DIV
    const x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV
    setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
  }

  enableNotification() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
  }

  get isAdmin() {
    return this.account && this.account.role === Role.Admin;
  }

  get isEstudante() {
    return this.account && this.account.role === Role.Estudante;
  }

  get isMotorista() {
    return this.account && this.account.role === Role.Motorista;
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/account/login']);
  }
}
