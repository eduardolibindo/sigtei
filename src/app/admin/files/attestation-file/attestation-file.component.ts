import { Component, ElementRef, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { AccountService } from 'src/app/_services/account.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { StudentlistService } from 'src/app/_services/student-list.service';



@Component({
  selector: 'app-attestation-file',
  templateUrl: './attestation-file.component.html',
  styleUrls: ['./attestation-file.component.css']
})
export class AttestationFileComponent {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  account = this.accountService.accountValue;
  name = '' + this.account.firstName + ' ' + this.account.lastName + '';
  
  student = this.studentlistService.studentlistValue;

  localStorageChanges$ = this.localStorageService.changes$;

  constructor(
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private studentlistService: StudentlistService,
  ) { }

  dataTime = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  public downloadAsPDF() {
    const doc = new jsPDF();
    // get table html
    const pdfTable = this.pdfTable.nativeElement;
    // html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
    var win = window.open('', '_self');
    const documentDefinition = {
      info: {
        title: 'Atestado de falta',
        author: this.name,
        subject: 'Atestado de falta para o Transporte Intermunicipal de Itaqui',
        keywords: 'Atestado',
      },
      content: html
    };

    var [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
    var [hour, minute, second] = new Date().toLocaleTimeString("pt-BR").split(/:| /);

    pdfMake.createPdf(documentDefinition).download(`Atestado de falta ${date}/${month}/${year} - ${hour}:${minute}:${second}`);

  }

  persist(key: string, value: any) {
    this.localStorageService.set(key, value);
  }


}
