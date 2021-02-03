import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../_services/alert.service';
import { AccountService } from './../../_services/account.service';

import { MustMatch } from '../../_helpers';

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
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      place: ['', Validators.required],
      street: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.accountService.getplaceById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
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
    if (this.isAddMode) {
      this.createPlaces();
    } else {
      this.updatePlaces();
    }
  }

  private createPlaces() {
    this.accountService.createPlace(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Local criado com Sucesso', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updatePlaces() {
    this.accountService.updatePlace(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Atualização Feita com Sucesso', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
