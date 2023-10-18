import { Subject } from 'rxjs';

export interface BaseEventType {
  type: EventBusName;
  payload?: any;
}

export interface BaseEvent<Payload> {
  type: EventBusName;
  payload?: Payload;
}

export enum EventBusName {
  LOGOUT = 'LOGOUT',
  SHOW_TOAST_EVENT = 'SHOW_TOAST_EVENT',
  GET_INFO_USER = 'GET_INFO_USER',
  SPLASH_INIT_VALUE = 'SPLASH_INIT_VALUE',
}

export default class EventBus {
  private static instance: EventBus;

  private eventSubject = new Subject();

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  get events(): any {
    return this.eventSubject.asObservable();
  }

  post<T extends BaseEventType>(event: T): void {
    this.eventSubject.next(event);
  }
}

export const onPushEventBus = (type: EventBusName, payload?: any) => {
  // console.tron.log('onPushEventBus: ', type, payload);
  EventBus.getInstance().post({ type, payload });
};
