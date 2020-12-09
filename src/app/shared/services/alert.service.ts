import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertsEmitter = new Subject();

  constructor() { }

  showDangerAlert(error: {errorCode: number, errorMessage: string}) {
    this.alertsEmitter.next(error);
  }
}
