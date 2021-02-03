import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FileService } from '../_services/file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css', './main.css']
})
export class FilesComponent implements OnInit {
  files: any[];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.getFiles1(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.files = fileUploads;
    });
  }

  deleteFile(id): void {
    this.fileService.deleteFile1(id);
  }

}
