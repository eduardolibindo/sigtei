import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FileUploadService } from 'src/app/_services/file-upload.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', './main.css']
})
export class ListComponent implements OnInit {
  fileUploads: any[];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

}
