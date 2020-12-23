import { first } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { AccountService } from '../_services';
import { StudentlistService } from '../_services/student-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', './main.css']
})
export class DetailsComponent implements OnInit {
  lists: any[];

  constructor(private accountService: AccountService, private studentlistService: StudentlistService) { }

  ngOnInit() {
    this.studentlistService.getstudentlistAll()
      .pipe(first())
      .subscribe(lists => this.lists = lists);
  }

  deleteLists(id: string) {
    const list = this.lists.find(x => x.id === id);
    list.isDeleting = true;
    this.studentlistService.deleteStudentList(id)
      .pipe(first())
      .subscribe(() => {
        this.lists = this.lists.filter(x => x.id !== id);
      });
  }
}
