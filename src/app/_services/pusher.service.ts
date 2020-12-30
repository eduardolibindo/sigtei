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
  }
  channel;

  public init() {
    return this.channel;
  }
}
