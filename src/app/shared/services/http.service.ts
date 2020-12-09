import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Product} from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get(`${environment.hostUrl}/api/v2/product-catalog/product`);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${environment.hostUrl}/api/v2/product-catalog/product/${productId}`);
  }

  addProduct(data: Product) {
    return this.http.post(`${environment.hostUrl}/api/v2/product-catalog/product`, {...data});
  }

  updateProduct(data: Product) {
    return this.http.put(`${environment.hostUrl}/api/v2/product-catalog/product`, {...data});
  }

  getProductInfo(productId: number) {
    return this.http.get(`${environment.hostUrl}/api/v2/product-catalog/product/${productId}`);
  }

  getImgUrl(imgCode: string) {
    return `${environment.hostUrl}/api/v2/product-catalog/product/image/${imgCode}`;
  }

  setProductImg(productId: number, imgFile) {
    return this.http.post(`${environment.hostUrl}/api/v2/product-catalog/product/${productId}/image`, imgFile);
  }

  getInvoiceStatusList() {
    return this.http.get(`${environment.hostUrl}/api/v2/ledger/invoice/status`);
  }

  getInvoiceList() {
    return this.http.get(`${environment.hostUrl}/api/v2/ledger/invoice`);
  }

  getInvoiceListForUser(userId: number) {
    return this.http.get(`${environment.hostUrl}/api/v2/ledger/invoice/user/${userId}`);
  }

  updateInvoiceStatus(invoiceId: number, invoiceStatus: string) {
    const params = new HttpParams().set('invoiceStatus', invoiceStatus);
    return this.http.patch(`${environment.hostUrl}/api/v2/ledger/invoice/${invoiceId}/status`, null, {params});
  }

  getClientInfo(invoiceId: number) {
    return this.http.get(`${environment.hostUrl}/api/v2/user-management/user/invoice/${invoiceId}`);
  }

  getClientsList() {
    return this.http.get(`${environment.hostUrl}/api/v2/user-management/user`);
  }

}
