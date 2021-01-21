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
  styleUrls: ['./attestation-file.component.css', './main.css']
})
export class AttestationFileComponent {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  account = this.accountService.accountValue;
  name = '' + this.account.firstName + ' ' + this.account.lastName + '';

  signature = '';
  student = '';
  semester = '';
  course = '';
  registration = '';
  data = '';

  // student = this.studentlistService.studentlistValue;

  localStorageChanges$ = this.localStorageService.changes$;

  constructor(
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private studentlistService: StudentlistService,
  ) { }

  dataTime = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

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
      content: [
        {
          text: '\n\n\nAtestado de Justificativa Sigtei\n\n\n',
          style: 'header',
          alignment: 'center'
        },
        {
          text: '\n\n\nSistema de Gerenciamento do Transporte Estudantil Intermunicipal\n\n',
          style: 'headerPry',
          alignment: 'center'
        },
        {
          text: [
            'S.I.G.T.E.I \n\n\n\n\n',
            'ITAQUI, RS \n\n\n\n\n',
            'ATESTADO \n\n\n'
          ],
          style: 'headerSec',
          alignment: 'center'
        },
        {
          text: [
            `Atestamos que ${this.student} matriculado regularmente no ${this.semester} semestre do curso de ${this.course} nesta instituição, sob o número ${this.registration} não se fez presente na aula do dia ${this.data} em decorrência do problemas no transporte a caminho de São Borja, motivo pela qual o aluno vem a justificar sua falta. Certos de sua compreensão agradecemos.`
          ],
          style: 'body',
          bold: false
        },
        {
          text: [
            '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n__________________________________________\n',
            'Responsavel \n\n',
          ],
          style: 'headerSec',
          alignment: 'center'
        },
        {
          text: `ITAQUI-RS, ${this.dataTime}`,
          style: 'footer',
          alignment: 'center'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        headerPry: {
          fontSize: 14,
          bold: true,
          alignment: 'justify'
        },
        headerSec: {
          fontSize: 12,
          bold: true,
          alignment: 'justify'
        },
        body: {
          fontSize: 12,
          bold: false,
          alignment: 'justify'
        },
        footer: {
          fontSize: 12,
          bold: true,
          alignment: 'justify'
        }
      }
    };

    var [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
    var [hour, minute, second] = new Date().toLocaleTimeString("pt-BR").split(/:| /);

    pdfMake.createPdf(documentDefinition).download(`Atestado ${this.student} ${date}/${month}/${year} - ${hour}:${minute}:${second}`);

  }

  persist(key: string, value: any) {
    this.localStorageService.set(key, value);
  }


}
