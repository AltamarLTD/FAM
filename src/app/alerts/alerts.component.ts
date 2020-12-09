import { Component, OnInit } from '@angular/core';
import {AlertService} from '../shared/services/alert.service';
import {timeout} from 'rxjs/operators';
import {timer} from 'rxjs';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alertMessage: {
    errorCode: number,
    errorMessage: string
  };

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {

    this.alertService.alertsEmitter.subscribe((errorInfo: {errorCode: number, errorMessage: string}) => {
      this.alertMessage = errorInfo;

      timer(3000).subscribe(() => {
        this.alertMessage = null;
      });
    });
  }

}
