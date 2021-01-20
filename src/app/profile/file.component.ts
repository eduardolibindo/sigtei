import { Component } from '@angular/core';

import { AccountService, AlertService } from '../_services';
import { FileUploadService } from '../_services/file-upload.service';
import { FileUpload } from '../_models/file';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

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

  private basePath = '/uploads';
  estudante: string;

  constructor(
    private accountService: AccountService,
    private uploadService: FileUploadService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage
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
    this.pushFileToStorage(this.currentFileUpload)
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

  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
    this.estudante = '' + this.account.firstName + ' ' + this.account.lastName + '';
    const filePath = `${this.basePath}/${this.estudante}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = this.estudante;
          this.uploadService.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

}
