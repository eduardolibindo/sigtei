import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );

  }

  /**
   * criar token no banco de dados do firebase
   *
   * @param userId userId como uma chave
   * @param token token como um valor
   */
  createToken(userId, token) {
    //  E possivel alterar esta função para solicitar nosso serviço de back-end
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token;
        this.angularFireDB.list('users_notification/').push(data);
      });
  }

  /**
   * atualizar token no banco de dados Firebase
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token) {
    // podemos alterar esta função para solicitar nosso serviço de back-end
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token;
        this.angularFireDB.object('users_notification/').update(data);
      });
  }

  /**
   * solicitar permissão para notificação do Firebase Cloud Messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.createToken(userId, token);
      },
      (err) => {
        console.error('Incapaz de obter permissão para a notificação.', err);
      }
    );
  }

  /**
   * método de gancho quando uma nova notificação é recebida em primeiro plano
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('Nova mensagem recebida. ', payload);
        this.currentMessage.next(payload);
      });
  }
}
