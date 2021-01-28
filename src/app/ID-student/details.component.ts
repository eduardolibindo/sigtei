import { Component, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from '../_services';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  account = this.accountService.accountValue;
  @ViewChild('pdfTable') pdfTable: ElementRef;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;
  value = this.account.id;
  name = '' + this.account.firstName + ' ' + this.account.lastName + '';

  data = {
    idStudent: this.account.id,
    title: this.account.title,
    firstName: this.account.firstName,
    lastName: this.account.lastName,
    email: this.account.email,
    rg: this.account.rg,
    institution: this.account.institution,
    course: this.account.course,
    phone: this.account.phone,
    location: this.account.location
  };

  dataString = JSON.stringify(this.data);

  constructor(private accountService: AccountService) { }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = {
      info: {
        title: 'Carteira Digital',
        author: this.name,
        subject: 'Carteira Digital do Estudante do Transporte Intermunicipal de Itaqui',
        keywords: 'Carteira Digital',
      },
      content: [html],
    };

    pdfMake.createPdf(documentDefinition).download(`Carteira Digital ${this.name}`);
  }
}
