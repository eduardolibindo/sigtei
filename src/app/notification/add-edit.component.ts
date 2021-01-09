import { AlertService } from './../_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NotificationService } from '../_services/notification.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      icon: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.notificationService.getnotificationById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createNotification();
    } else {
      this.updateNotification();
    }
  }

  private createNotification() {
    this.notificationService.createNotification(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Notificação criada com Sucesso', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateNotification() {
    this.notificationService.updateNotification(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Notificação Feita com Sucesso', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
