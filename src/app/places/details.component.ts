import { Places } from './../_models/places';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  Place: Places;
  places: any[];

  // account = this.accountService.accountValue;
  constructor(private accountService: AccountService) {
    this.accountService.places.subscribe(x => this.Place = x);
  }

  ngOnInit() {
    this.accountService.getplaceAll()
      .pipe(first())
      .subscribe(places => this.places = places);
  }
}
