import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../shared/services/http.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {InvoiceItem} from '../shared/interfaces/invoice-item';

@UntilDestroy()
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})

export class InvoicesComponent implements OnInit, OnDestroy {
  itemList: InvoiceItem[];
  clientModalInfo: {
    city: string,
    company: string,
    country: string,
    email: string,
    name: string,
    phone: string,
    region: string,
    surname: string,
    invoiceId: number,
    invoiceSum: number
  };
  statusList: Array<string>;

  constructor(private http: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.queryParams.clientId;
    this.http.getInvoiceStatusList().pipe(untilDestroyed(this))
      .subscribe((res: {code: number, message: string, result: {status: string}[]}) => {
        this.statusList = res.result.map(el => el.status);
      });

    if (userId) {
      this.http.getInvoiceListForUser(userId).subscribe((res: any) => {
        this.itemList = res.result;
      });
    } else {
      this.http.getInvoiceList().pipe(untilDestroyed(this)).subscribe((res: {code: number, message: string, result: InvoiceItem[]}) => {
        this.itemList = res.result;
      });
    }
  }

  onUpdateStatus(item) {
    this.http.updateInvoiceStatus(item.id, item.invoiceStatusDTO.status).pipe(untilDestroyed(this))
      .subscribe((res: {code: number, message: string, result: InvoiceItem}) => {
      console.log(res);
    });
  }

  getClientInfo(id: number) {
    this.http.getClientInfo(id).pipe(untilDestroyed(this)).subscribe((res: any) => {
      console.log(res);
      this.clientModalInfo = res.result;
      this.clientModalInfo.invoiceId = id;
      this.clientModalInfo.invoiceSum = this.itemList.find(item => item.id === id).sum;
    });
  }

  onModalWrapperClick(e) {
    if (e.target.id === 'modal') { // outside click
      this.clientModalInfo = null;
    }
  }

  ngOnDestroy() {
  }
}
