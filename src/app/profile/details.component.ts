import { Component } from '@angular/core';

import { AccountService } from '../_services';
import { FileUploadService } from '../_services/file-upload.service';
import { FileUpload } from '../_models/file';

@Component({
  selector: 'app-udetailsdate',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  account = this.accountService.accountValue;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(
    private accountService: AccountService,
    private uploadService: FileUploadService
  ) { }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    // this.selectedFiles = undefined;
    // https://github.com/bezkoder/angular-10-firebase-storage

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }
}
