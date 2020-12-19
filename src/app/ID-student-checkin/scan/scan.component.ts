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
  ID: string;
  TITLE: string;
  FIRSTNAME: string;
  LASTNAME: string;
  EMAIL: string;
  RG: string;
  INSTITUTION: string;
  COURSE: string;
  PHONE: string;
  ADDRESS: string;
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss', './scan.component.css']
})
export class ScanComponent implements OnInit {
  account = this.accountService.accountValue;
  // list: any[];
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
    private alertService: AlertService) { }

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   title: [this.account.title, Validators.required],
    //   firstName: [this.account.firstName, Validators.required],
    //   lastName: [this.account.lastName, Validators.required],
    //   email: [this.account.email, [Validators.required, Validators.email]],
    //   rg: [this.account.rg, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    //   institution: [this.account.institution, Validators.required],
    //   course: [this.account.course, Validators.required],
    //   phone: [this.account.phone, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
    //   address: [this.account.address, Validators.required]
    // });
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;

    let list: MyObj = JSON.parse(this.qrResultString);

    this.form = this.formBuilder.group({
      title: [list.TITLE, Validators.required],
      firstName: [list.FIRSTNAME, Validators.required],
      lastName: [list.LASTNAME, Validators.required],
      email: [list.EMAIL, [Validators.required, Validators.email]],
      rg: [list.RG, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      institution: [list.INSTITUTION, Validators.required],
      course: [list.COURSE, Validators.required],
      phone: [list.PHONE, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      address: [list.ADDRESS, Validators.required]
    });

    this.onSubmit()
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.studentlistService.createStudentList(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Atualização bem sucedida', { keepAfterRouteChange: true });
          // this.router.navigate(['../'], { relativeTo: this.route });
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
