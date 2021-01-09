import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';

const notify = `${environment.apiUrl}/notify`;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  submitted = false;

  options = {
    title: 'Lokesh',
    body: 'Browser Notification..!'
  };

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private afMessaging: AngularFireMessaging
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  get f() { return this.formGroup.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.formGroup.invalid) {
      return;
    }

    this.sendNodeNotification(this.options = {title: this.f.title.value, body: this.f.body.value});

  }

  notifyServer(notification) {
    this.http
      .post(notify, notification)
      .subscribe((res) => { });
  }

  sendNodeNotification(notification) {
    this.notifyServer({
      title: notification.title,
      body: notification.body
    });
  }

  setNotification() {
    this.sendNodeNotification(this.options);
  }

  requestPushNotificationsPermission() { // requesting permission
    this.afMessaging.requestToken // getting tokens
      .subscribe(
        (token) => { // USER-REQUESTED-TOKEN
          console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          console.error('Permission denied!', error);
        }
      );
  }

}
