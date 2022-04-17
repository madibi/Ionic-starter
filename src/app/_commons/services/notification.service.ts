import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import {io, Socket} from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class NotificationService {

  socket: Socket;
  constructor(
  ) {
    this.socket = io(environment.wsUrl,
      {
        path: '/notification/',
        transports : ['websocket'],
        extraHeaders: {
          key: 'value'
        },
        query: { authorization: 'x'},
      }
    );
  }

  listenNotification(): Observable<string> {
    const observable: Observable<string> = new Observable(observer => {
      this.socket.on('notificationToClient', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
