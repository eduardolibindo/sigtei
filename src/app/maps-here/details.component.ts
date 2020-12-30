import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../_services';
import { Account, Role } from '../_models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  Role = Role;
  account: Account;

  constructor(private router: Router, private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  ngOnInit() {}

  get isAdmin() {
    return this.account && this.account.role === Role.Admin;
  }

  get isEstudante() {
    return this.account && this.account.role === Role.Estudante;
  }

  get isMotorista() {
    return this.account && this.account.role === Role.Motorista;
  }

}
