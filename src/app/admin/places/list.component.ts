import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', './main.css']
})
export class ListComponent implements OnInit {
  places: any[];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getplaceAll()
      .pipe(first())
      .subscribe(places => this.places = places);
  }

  deletePlaces(id: string) {
    const place = this.places.find(x => x.id === id);
    place.isDeleting = true;
    this.accountService.deletePlace(id)
      .pipe(first())
      .subscribe(() => {
        this.places = this.places.filter(x => x.id !== id)
      });
  }
}
