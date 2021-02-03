import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { FileService } from 'src/app/_services/file.service';
import { FileUpload } from '../../../_models/file';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', '../styles/main.css']
})
export class UploadComponent implements OnInit {

  selectedFile: any = null;

  private basePath = '/pdfs';

  url:string;
  id:string;
  file:string;

  constructor(
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    @Inject(FileService) private fileService: FileService) { }

  ngOnInit():void {

  }

  showPreview(event: any) {
      this.selectedFile = event.target.files[0];
  }

  save() {
      var name = this.selectedFile.name;
      var n = new Date();
      const filePath = `${this.basePath}/${name}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url = url;

            alert('Upload Feito com Sucesso');
          })
        })
      ).subscribe();
  }

}
