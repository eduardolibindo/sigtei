import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';
import { MustMatch } from '../_helpers';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  account = this.accountService.accountValue;
  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [this.account.title, Validators.required],
      firstName: [this.account.firstName, Validators.required],
      lastName: [this.account.lastName, Validators.required],
      email: [this.account.email, [Validators.required, Validators.email]],
      rg: [this.account.rg, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      institution: [this.account.institution, Validators.required],
      course: [this.account.course, Validators.required],
      phone: [this.account.phone, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      address: [this.account.address, Validators.required],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
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
    this.accountService.update(this.account.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Atualização bem sucedida', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.deleting = true;
      this.accountService.delete(this.account.id)
        .pipe(first())
        .subscribe(() => {
          this.alertService.success('Conta excluída com sucesso', { keepAfterRouteChange: true });
        });
    }
  }
}
