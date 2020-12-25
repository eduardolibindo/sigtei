import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './_services';
import { Account, Role } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sigtei';
  Role = Role;
  account: Account;

  constructor(private router: Router, private accountService: AccountService) {
      this.accountService.account.subscribe(x => this.account = x);
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
