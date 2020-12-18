import { Schedules } from './../_models/schedules';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  Schedule: Schedules;
  schedules: any[];

  // account = this.accountService.accountValue;
  constructor(private accountService: AccountService) {
    this.accountService.schedules.subscribe(x => this.Schedule = x);
  }
  ngOnInit() {
    this.accountService.getscheduleAll()
      .pipe(first())
      .subscribe(schedules => this.schedules = schedules);
  }
}
