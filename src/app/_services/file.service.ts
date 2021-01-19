import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  imageDetailList: AngularFireList<any>;

  fileList: any[];

  dataSet: Data = {
    id:'',
    url:''
  };

  msg:string = 'error';

  private basePath = '/pdfs';

  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
    console.log(this.imageDetailList);
  }

  insertImageDetails(id,url) {
    this.dataSet = {
      id : id,
      url: url
    };
    this.imageDetailList.push(this.dataSet);
  }

  getImage(value)
  {
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => { return item.payload.val(); });
        this.fileList.forEach(element => {
          if(element.id===value)
            this.msg = element.url;
        });
        if(this.msg==='error')
          alert('Arquivo não encontrado');
        else
        {
          window.open(this.msg);
          this.msg = 'error';
        }
      }
    );
  }
}

export interface Data
{
  id:string;
  url:string;
}
