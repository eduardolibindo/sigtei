import { Component } from '@angular/core';
import { Role } from '../_models/role';
import { AccountService } from '../_services';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  account = this.accountService.accountValue;

  constructor(
    private accountService: AccountService,
  ) { }


  get isAdmin() {
    return this.account && this.account.role === Role.Admin;
  }

  get isEstudante() {
    return this.account && this.account.role === Role.Estudante;
  }

}







