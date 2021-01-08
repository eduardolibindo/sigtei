import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable()
export class PusherService {
  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher('a9dff7ecba6e6bf75832', {
      cluster: 'us2',
    });
    this.channel = this.pusherClient.subscribe('location');
    this.channel1 = this.pusherClient.subscribe('notification');
  }
  channel;
  channel1;

  public init() {
    return this.channel;
  }

  public init1() {
    return this.channel1;
  }
}
