import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './_services';
import { Account, Role } from './_models';
import { SwPush } from '@angular/service-worker';
import { PusherService } from './_services/pusher.service';
import { MessagingService } from './_services/messaging.service';
import { NotificationService } from './_services/notification.service';
import { first } from 'rxjs/operators';

const VAPID_PUBLIC = 'BKqOvOXQusxAXzOiRd9_v9aBuQln1CwnnpShklyLvf4BvWIAniKwIC-0M8T2R2XKxc3_QZiDC2OnF1I_NHIPIro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService,
    public swPush: SwPush,
    private pusher: PusherService,
    private messagingService: MessagingService,
    private notificationService: NotificationService
  ) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  get isAdmin() {
    return this.account && this.account.role === Role.Admin;
  }

  get isEstudante() {
    return this.account && this.account.role === Role.Estudante;
  }

  get isMotorista() {
    return this.account && this.account.role === Role.Motorista;
  }
  title = 'sigtei';
  Role = Role;
  account: Account;

  options: any = {};

  titulo: string;
  corpo: string;
  data: string;

  hidden = false;
  badgeContent = 1;

  notifications: any[];

  message;

  @ViewChild('audioOption') audioPlayerRef: ElementRef;

  ngOnInit() {
    const channel = this.pusher.init1();
    channel.bind('notify', (notification) => {
      this.titulo = notification.title;
      this.corpo = notification.body;

      this.options = {
        ...notification
      };

      this.data = JSON.stringify(this.options);

    });

    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.notificationService.getnotificationAll()
      .pipe(first())
      .subscribe(notifications => this.notifications = notifications);
  }

  myFunction() {
    if (this.badgeContent !== 0) {
      // this.playAudio();
      this.audioPlayerRef.nativeElement.play();
      this.hidden = !this.hidden;
      // Obtem o snackbar DIV
      const x = document.getElementById('snackbar');
      const y = document.getElementById('audio');

      // Adicione a classe "show" a DIV
      x.className = 'show';

      // Após 3 segundos, e removido a classe show da DIV
      setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);

      this.badgeContent = 0;
    } else {
      // this.playAudio();
      this.audioPlayerRef.nativeElement.play();
      // Obtenha o snackbar DIV
      const x = document.getElementById('snackbarOff');

      // Adicione a classe "show" ao DIV
      x.className = 'show';

      // Após 3 segundos, e removido a classe show do DIV
      setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
    }
  }

  playAudio(){
    const audio = new Audio();
    audio.src = '../assets/sounds/intuition-561.mp3';
    audio.load();
    audio.play();
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  enableNotification() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/account/login']);
  }
}
