import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, pipe } from 'rxjs';
import { ZXingScannerComponent } from 'angular-weblineindia-qrcode-scanner';
import { BarcodeFormat } from 'angular-weblineindia-qrcode-scanner/library';
import { FormatsDialogComponent } from '../formats-dialog/formats-dialog.component';
import { AccountService } from '../../_services/account.service';
import { StudentlistService } from 'src/app/_services/student-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services';

interface MyObj {
  idStudent: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  rg: string;
  institution: string;
  course: string;
  phone: string;
  location: string;
}

interface ReadonlyMyObj {
  readonly idStudent: string;
  readonly title: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly rg: string;
  readonly institution: string;
  readonly course: string;
  readonly phone: string;
  readonly location: string;
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss', './scan.component.css']
})
export class ScanComponent implements OnInit {
  account = this.accountService.accountValue;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  form: FormGroup;
  loading = false;
  submitted = false;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  estudante: string;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly _dialog: MatDialog,
    private accountService: AccountService,
    private studentlistService: StudentlistService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  clearResult(): void {
    this.estudante = null;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    // this.estudante = resultString;

    let qrResultString: MyObj  = JSON.parse(resultString, (key, value) => {
      if (typeof value === 'string') {
        return value.toLowerCase();
      }
      return value;
    });

    let obj: ReadonlyMyObj = qrResultString;

    this.estudante = '' + obj.firstName + ' ' + obj.lastName + '';

    this.form = this.formBuilder.group({
      idStudent: [obj.idStudent, Validators.required],
      title: [obj.title, Validators.required],
      firstName: [obj.firstName, Validators.required],
      lastName: [obj.lastName, Validators.required],
      email: [obj.email, [Validators.required]],
      rg: [obj.rg, [Validators.required]],
      institution: [obj.institution, Validators.required],
      course: [obj.course, Validators.required],
      phone: [obj.phone, [Validators.required]],
      location: [obj.location, Validators.required]
    });

    this.loading = true;
    this.studentlistService.createStudentList(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Cadastro bem sucedido', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

}
