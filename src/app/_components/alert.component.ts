import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '../_models';
import { AlertService } from '../_services';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    // inscreva-se para novas notificações de alerta
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // limpa alertas quando um alerta vazio for recebido
        if (!alert.message) {
          // filtrar alertas sem o sinalizador 'keepAfterRouteChange'
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove a sinalização 'keepAfterRouteChange' no resto
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // adiciona alerta ao array
        this.alerts.push(alert);

        // alerta de fechamento automático, se necessário
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // limpar alertas em mudança de local
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    // cancele a inscrição para evitar vazamentos de memória
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // verifique se já foi removido para evitar erro no fechamento automático
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // alerta tipo fade out
      alert.fade = true;

     // remove o alerta após desaparecer
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove o alerta
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClasses(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
