import { first } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as moment from 'moment';
import { AccountService } from '../_services';
import { StudentlistService } from '../_services/student-list.service';
import { LocalStorageService } from '../_services/local-storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', './main.css']
})
export class DetailsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  lists: any[];
  currentTutorial = null;
  currentIndex = -1;

  account = this.accountService.accountValue;
  name = '' + this.account.firstName + ' ' + this.account.lastName + '';

  localStorageChanges$ = this.localStorageService.changes$;

  constructor(
    private accountService: AccountService,
    private studentlistService: StudentlistService,
    private localStorageService: LocalStorageService) { }

  // dataTime2 = moment().locale()
  // dataTime = moment().format('LLLL');
  // dataTime3 = new Date();

  dataTime = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

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

  retrieveLists(): void {
    this.studentlistService.getstudentlistAll()
      .subscribe(
        data => {
          this.lists = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  refreshList(): void {
    this.retrieveLists();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  deleteListAll(): void {
    this.studentlistService.deleteListAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  public downloadAsPDF() {
    const doc = new jsPDF();
    // get table html
    const pdfTable = this.pdfTable.nativeElement;
    // html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
    var win = window.open('', '_self');

    const documentDefinition = {
      info: {
        title: 'Lista',
        author: this.name,
        subject: 'Lista de Presença dos Estudantes do Transporte Intermunicipal de Itaqui',
        keywords: 'lista',
      },
      content: html
    };

    var [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
    var [hour, minute, second] = new Date().toLocaleTimeString("pt-BR").split(/:| /);

    pdfMake.createPdf(documentDefinition).download(`Lista de Presença ${date}/${month}/${year} - ${hour}:${minute}:${second}`);

  }

  persist(key: string, value: any) {
    this.localStorageService.set(key, value);
  }

}
