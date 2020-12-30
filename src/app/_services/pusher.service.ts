import { Injectable } from '@angular/core';
declare const Pusher: any;

@Injectable()
export class PusherService {
  constructor() {
    const pusher = new Pusher('a9dff7ecba6e6bf75832', {
      cluster: 'us2',
    });
    this.channel = pusher.subscribe('location');
  }
  channel;

  public init() {
    return this.channel;
  }
}
