import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPushNotificationService } from 'ngx-push-notification';
import { AccountService } from './_services';
import { Account, Role } from './_models';
import { SwPush } from '@angular/service-worker';
import { PusherService } from './_services/pusher.service';

interface MyObj {
  title: string;
  body: string;
  icon: string;
}

interface ReadonlyMyObj {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
}

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
  options = {
    title: 'oi',
    body: 'oi',
    icon: 'oi'
  };
  titulo: string;
  corpo: string;
  icone: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
    public swPush: SwPush,
    private pusher: PusherService,
    private ngxPushNotificationService: NgxPushNotificationService
  ) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  ngOnInit() {
    const channel = this.pusher.init1();
    channel.bind('notify', (notification) => {
      this.titulo = notification.title;
      this.corpo = notification.body;
      this.icone = notification.icon;

      this.showDesktopNotification(this.titulo, this.corpo, this.icone);
      // this.options = {
      //   ...notification
      // };
      // const option = JSON.stringify(notification);
      // this.date = option;
    });
  }

  showDesktopNotification(titulo, corpo, icone) {
    this.ngxPushNotificationService.showNotification({
      title: titulo,
      body: corpo,
      icon: icone
    }).subscribe((res: any) => {
      if (res.type === 'show') {
        console.log('show');
      } else if (res.type === 'click') {
        console.log('click');
      } else {
        console.log('close');
      }
    });
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
