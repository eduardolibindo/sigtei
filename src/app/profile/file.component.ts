import { Component } from '@angular/core';

import { AccountService, AlertService } from '../_services';
import { FileUploadService } from '../_services/file-upload.service';
import { FileUpload } from '../_models/file';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  account = this.accountService.accountValue;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  loading = false;

  constructor(
    private accountService: AccountService,
    private uploadService: FileUploadService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.loading = true;
    // https://github.com/bezkoder/angular-10-firebase-storage

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload)
    .subscribe({
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      },
      complete: () => {
        this.alertService.success('Envio bem sucedido', { keepAfterRouteChange: true });
        this.router.navigate(['../'], { relativeTo: this.route });
        this.loading = false;
      }
    });
  }
}







