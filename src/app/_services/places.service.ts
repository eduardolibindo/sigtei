import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Places } from '../_models';

const baseUrl = `${environment.apiUrl}/places`;

@Injectable({ providedIn: 'root' })
export class PlacesService {
  private placesSubject: BehaviorSubject<Places>;
  public places: Observable<Places>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.placesSubject = new BehaviorSubject<Places>(null);
    this.places = this.placesSubject.asObservable();
  }

  public get placesValue(): Places {
    return this.placesSubject.value;
  }

  getAll() {
    return this.http.get<Places[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Places>(`${baseUrl}/${id}`);
  }

  create(params) {
    return this.http.post(baseUrl, params);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params)
      .pipe(map((places: any) => {
        // update the current places if it was updated
        if (places.id === this.placesValue.id) {
          // publish updated places to subscribers
          places = { ...this.placesValue, ...places };
          this.placesSubject.next(places);
        }
        return places;
      }));
  }


  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
