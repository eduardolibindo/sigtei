import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StudentList } from '../_models';

const studentlistUrl = `${environment.apiUrl}/student-list`;

@Injectable({ providedIn: "root"})
export class StudentlistService {

  private studentlistSubject: BehaviorSubject<StudentList>;
  public studentlist: Observable<StudentList>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.studentlistSubject = new BehaviorSubject<StudentList>(null);
    this.studentlist = this.studentlistSubject.asObservable();
  }

  public get studentlistValue(): StudentList {
    return this.studentlistSubject.value;
  }

  getstudentlistAll() {
    return this.http.get<StudentList[]>(studentlistUrl);
  }

  getstudentlistById(idStudent: string) {
    return this.http.get<StudentList>(`${studentlistUrl}/${idStudent}`);
  }

  createStudentList(params) {
    return this.http.post(studentlistUrl, params);
  }

  updateStudentList(idStudent, params) {
    return this.http.put(`${studentlistUrl}/${idStudent}`, params)
      .pipe(map((studentlists: any) => {
        // update the current account if it was updated
        if (studentlists.idStudent === this.studentlistValue.idStudent) {
          // publish updated account to subscribers
          studentlists = { ...this.studentlistValue, ...studentlists };
          this.studentlistSubject.next(studentlists);
        }
        return studentlists;
      }));
  }

  deleteStudentList(idStudent: string) {
    return this.http.delete(`${studentlistUrl}/${idStudent}`);
  }

















}
