import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account } from '../_models';
import { Places } from '../_models';

const baseUrl = `${environment.apiUrl}/accounts`;
const placesUrl = `${environment.apiUrl}/places`;

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  private placesSubject: BehaviorSubject<Places>;
  public places: Observable<Places>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();

    this.placesSubject = new BehaviorSubject<Places>(null);
    this.places = this.placesSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  public get placesValue(): Places {
    return this.placesSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
      .pipe(map(account => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  logout() {
    this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  refreshToken() {
    return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
      .pipe(map((account) => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  register(account: Account) {
    return this.http.post(`${baseUrl}/register`, account);
  }

  verifyEmail(token: string) {
    return this.http.post(`${baseUrl}/verify-email`, { token });
  }

  forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email });
  }

  validateResetToken(token: string) {
    return this.http.post(`${baseUrl}/validate-reset-token`, { token });
  }

  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
  }

  getAll() {
    return this.http.get<Account[]>(baseUrl);
  }

  getplaceAll() {
    return this.http.get<Places[]>(placesUrl);
  }

  getById(id: string) {
    return this.http.get<Account>(`${baseUrl}/${id}`);
  }

  getplaceById(id: string) {
    return this.http.get<Places>(`${placesUrl}/${id}`);
  }

  create(params) {
    return this.http.post(baseUrl, params);
  }

  createPlace(params) {
    return this.http.post(placesUrl, params);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params)
      .pipe(map((account: any) => {
        // update the current account if it was updated
        if (account.id === this.accountValue.id) {
          // publish updated account to subscribers
          account = { ...this.accountValue, ...account };
          this.accountSubject.next(account);
        }
        return account;
      }));
  }

  updatePlace(id, params) {
    return this.http.put(`${placesUrl}/${id}`, params)
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
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(finalize(() => {
        // auto logout if the logged in account was deleted
        if (id === this.accountValue.id) {
          this.logout();
        }
      }));
  }

  deletePlace(id: string) {
    return this.http.delete(`${placesUrl}/${id}`);
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
