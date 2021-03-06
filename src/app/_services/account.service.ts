﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Account } from '../_models';
import { Places } from '../_models';
import { Schedules } from '../_models';

const baseUrl = `${environment.apiUrl}/accounts`;
const placesUrl = `${environment.apiUrl}/places`;
const schedulesUrl = `${environment.apiUrl}/schedules`;

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  private placesSubject: BehaviorSubject<Places>;
  public places: Observable<Places>;

  private schedulesSubject: BehaviorSubject<Schedules>;
  public schedules: Observable<Schedules>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();

    this.placesSubject = new BehaviorSubject<Places>(null);
    this.places = this.placesSubject.asObservable();

    this.schedulesSubject = new BehaviorSubject<Schedules>(null);
    this.schedules = this.schedulesSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  public get placesValue(): Places {
    return this.placesSubject.value;
  }

  public get schedulesValue(): Schedules {
    return this.schedulesSubject.value;
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

  getscheduleAll() {
    return this.http.get<Schedules[]>(schedulesUrl);
  }

  getById(id: string) {
    return this.http.get<Account>(`${baseUrl}/${id}`);
  }

  getplaceById(id: string) {
    return this.http.get<Places>(`${placesUrl}/${id}`);
  }

  getscheduleById(id: string) {
    return this.http.get<Schedules>(`${schedulesUrl}/${id}`);
  }

  create(params) {
    return this.http.post(baseUrl, params);
  }

  createPlace(params) {
    return this.http.post(placesUrl, params);
  }

  createSchedule(params) {
    return this.http.post(schedulesUrl, params);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params)
      .pipe(map((accounts: any) => {
      // atualiza account atual se ela foi atualizada
          // publicar account atualizada para o subscribers
          accounts = { ...this.accountValue, ...accounts };
          this.accountSubject.next(accounts);
          return accounts;
      }));
  }

  updatePlace(id, params) {
    return this.http.put(`${placesUrl}/${id}`, params)
      .pipe(map((places: any) => {
      // atualiza place atual se ela foi atualizada
          // publicar place atualizada para o subscribers
          places = { ...this.placesValue, ...places };
          this.placesSubject.next(places);
          return places;
      }));
  }

  updateSchedule(id, params) {
    return this.http.put(`${schedulesUrl}/${id}`, params)
      .pipe(map((schedules: any) => {
      // atualiza schedule atual se ela foi atualizada
          // publicar schedule atualizada para o subscribers
          schedules = { ...this.accountValue, ...schedules };
          this.accountSubject.next(schedules);
          return schedules;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(finalize(() => {
        // logout automático se a conta conectada for excluída
        if (id === this.accountValue.id) {
          this.logout();
        }
      }));
  }

  deletePlace(id: string) {
    return this.http.delete(`${placesUrl}/${id}`);
  }

  deleteSchedule(id: string) {
    return this.http.delete(`${schedulesUrl}/${id}`);
  }

// métodos auxiliares

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // analisar o objeto json do token jwt codificado em base64
    const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

    // define um tempo limite para atualizar o token um minuto antes de expirar
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
