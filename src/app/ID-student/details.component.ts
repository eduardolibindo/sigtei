import { Component } from '@angular/core';
import { AccountService } from '../_services';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    account = this.accountService.accountValue;

    elementType = NgxQrcodeElementTypes.URL;
    correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;
    value = this.account.id;

    data = {
      idStudent: this.account.id,
      title: this.account.title,
      firstName: this.account.firstName,
      lastName: this.account.lastName,
      email: this.account.email,
      rg: this.account.rg,
      institution: this.account.institution,
      course: this.account.course,
      phone: this.account.phone,
      location: this.account.location
    };

    dataString = JSON.stringify(this.data);

    constructor(private accountService: AccountService) { }
}
