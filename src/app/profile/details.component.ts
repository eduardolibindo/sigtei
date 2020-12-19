import { Component } from '@angular/core';

import { AccountService } from '../_services';

@Component({
  selector: 'app-udetailsdate',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    account = this.accountService.accountValue;
    
    constructor(private accountService: AccountService) { }
}
