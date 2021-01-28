import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  FileDetailList: AngularFireList<any>;

  fileList: any[];

  dataSet: Data = {
    id: '',
    name: '',
    url: ''
  };

  msg: string = 'error';

  private basePath = '/atestados';
  private basePath1 = '/Lista_de_presença';

  constructor(
    @Inject(AngularFireDatabase) private firebase: AngularFireDatabase,
    @Inject(AngularFireStorage) private storage: AngularFireStorage ) { }

  saveFileData(id, name, url): void {
    this.dataSet = {
      id: id,
      name: name,
      url: url
    };
    this.firebase.list(this.basePath).push(this.dataSet);
  }

  saveFileData1(id, name, url): void {
    this.dataSet = {
      id: id,
      name: name,
      url: url
    };
    this.firebase.list(this.basePath1).push(this.dataSet);
  }

  getfile(name: any) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name);
  }

  getFiles(numberItems): AngularFireList<any> {
    return this.firebase.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  getFiles1(numberItems): AngularFireList<any> {
    return this.firebase.list(this.basePath1, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(id: any): void {
    this.deleteFileDatabase(id.key)
      .then(() => {
        this.deleteFileStorage(id.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(id: string): Promise<void> {
    return this.firebase.list(this.basePath).remove(id);
  }

  private deleteFileStorage(id: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(id).delete();
  }

  deleteFile1(id: any): void {
    this.deleteFileDatabase1(id.key)
      .then(() => {
        this.deleteFileStorage1(id.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase1(id: string): Promise<void> {
    return this.firebase.list(this.basePath1).remove(id);
  }

  private deleteFileStorage1(id: string): void {
    const storageRef = this.storage.ref(this.basePath1);
    storageRef.child(id).delete();
  }

}

export interface Data {
  id: string;
  name: string;
  url: string;
}
