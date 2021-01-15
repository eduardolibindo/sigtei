import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/_models';
import { FileUploadService } from 'src/app/_services/file-upload.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() fileUpload: FileUpload;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void { }

  deleteFileUpload(fileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}
