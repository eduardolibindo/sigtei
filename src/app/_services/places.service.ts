import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Places } from '../_models';
import { Account } from '../_models';

const baseUrl = `${environment.apiUrl}/places`;

@Injectable({ providedIn: 'root' })
export class PlacesService {
  private placesSubject: BehaviorSubject<Places>;
  public places: Observable<Places>;

  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.placesSubject = new BehaviorSubject<Places>(null);
    this.places = this.placesSubject.asObservable();

    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get placesValue(): Places {
    return this.placesSubject.value;
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  refreshToken() {
    return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
      .pipe(map((account) => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
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
  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
