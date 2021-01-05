import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './_services';
import { Account, Role } from './_models';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './_services/pushNotification.service';

const VAPID_PUBLIC = 'BKqOvOXQusxAXzOiRd9_v9aBuQln1CwnnpShklyLvf4BvWIAniKwIC-0M8T2R2XKxc3_QZiDC2OnF1I_NHIPIro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sigtei';
  Role = Role;
  account: Account;

  constructor(
    private router: Router,
    private accountService: AccountService,
    public swPush: SwPush,
    public pushService: PushNotificationService
    )
  {
      this.accountService.account.subscribe(x => this.account = x);
  }

  submitSubscription(){
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC
        })
        .then(subscription => {
          this.pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
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
