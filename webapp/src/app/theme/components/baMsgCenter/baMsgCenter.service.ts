import { Injectable } from '@angular/core'

@Injectable()
export class BaMsgCenterService {

  private _notifications = [
    {
      name: 'Information',
      text: 'This is a test notification.',
      time: '1 min ago'
    },
    {
      name: 'Alert',
      text: 'This is a test notification.',
      time: '2 min ago'
    },
    {
      name: 'Error',
      text: 'This is a test notification.',
      time: '3 min ago'
    }
  ];

  private _messages = [
    {
      name: 'NuttLoose',
      text: 'This is a test message from NuttLoose',
      time: '1 min ago'
    },
    {
      name: 'NuttLoose',
      text: 'This is a test message from NuttLoose',
      time: '2 min ago'
    },
    {
      name: 'NuttLoose',
      text: 'This is a test message from NuttLoose',
      time: '3 min ago'
    },
  ];

  public getMessages(): Array<Object> {
    return this._messages;
  }

  public getNotifications(): Array<Object> {
    return this._notifications;
  }
}
