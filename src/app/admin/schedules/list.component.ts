import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', './main.css']
})
export class ListComponent implements OnInit {
  schedules: any[];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getscheduleAll()
      .pipe(first())
      .subscribe(schedules => this.schedules = schedules);
  }

  deleteSchedules(id: string) {
    const schedule = this.schedules.find(x => x.id === id);
    schedule.isDeleting = true;
    this.accountService.deleteSchedule(id)
      .pipe(first())
      .subscribe(() => {
        this.schedules = this.schedules.filter(x => x.id !== id);
      });
  }
}
