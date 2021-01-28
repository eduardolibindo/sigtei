import { finalize, first, map } from 'rxjs/operators';
import { Inject, OnInit } from '@angular/core';
import { Component, ViewChild, ElementRef } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as moment from 'moment';
import { AccountService } from '../_services';
import { StudentlistService } from '../_services/student-list.service';
import { LocalStorageService } from '../_services/local-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileService } from '../_services/file.service';

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
  placa = 'Placa';

  account = this.accountService.accountValue;
  name = '' + this.account.firstName + ' ' + this.account.lastName + '';

  localStorageChanges$ = this.localStorageService.changes$;

  private basePath = '/Lista_de_presença';

  url: any;
  files: any[];

  constructor(
    private accountService: AccountService,
    private studentlistService: StudentlistService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    @Inject(FileService) private fileService: FileService,
    private localStorageService: LocalStorageService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/cancel.svg'));
  }

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

    // pdfMake.createPdf(documentDefinition).download(`Lista de Presença ${date}/${month}/${year} - ${hour}:${minute}:${second}`);
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

    pdfDocGenerator.getBase64((data) => {

      const filePath = `${this.basePath}`;
      const fileRef = this.storage.ref(filePath).child(`Lista de Presença ${date}-${month}-${year}`);
      fileRef.putString(data, 'base64', { contentType: 'application/pdf' }).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url = url;
            this.name = `Lista de Presença ${date}/${month}/${year}`;
            this.fileService.saveFileData1(`${date}/${month}/${year}`, this.name, this.url);
            alert('Salvo com Sucesso');
          });
        })
      ).subscribe();


    });

  }

  persist(key: string, value: any) {
    this.localStorageService.set(key, value);
  }

}
