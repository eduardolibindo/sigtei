import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // getter de conveniência para fácil acesso aos campos do formulário
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // redefinir alertas ao enviar
    this.alertService.clear();

    // pare aqui se o formulário for inválido
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.alertService.clear();
    this.accountService.forgotPassword(this.f.email.value)
      .pipe(first())
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.alertService.success('Verifique seu e-mail para obter instruções de redefinição de senha'),
        error: error => this.alertService.error(error)
      });
  }
}
