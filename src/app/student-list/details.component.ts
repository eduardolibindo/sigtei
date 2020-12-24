import { first } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { Component, ViewChild, ElementRef  } from '@angular/core';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as moment from 'moment';
import { AccountService } from '../_services';
import { StudentlistService } from '../_services/student-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', './main.css']
})
export class DetailsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  lists: any[];

  constructor(private accountService: AccountService, private studentlistService: StudentlistService) {
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

  public downloadAsPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
    var win = window.open('', '_self');

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).print({}, win);

  }
}
