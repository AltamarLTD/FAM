import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../shared/interfaces/product';
import {HttpService} from '../shared/services/http.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {take} from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit, OnDestroy {

  productList: Array<Product> = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getProductList().pipe(untilDestroyed(this)).subscribe((res: {code: number; massage: string; result: Array<Product>}) => {
      console.log(res);
      this.productList = res.result;
    });
  }

  onItemDelete(id: number) {
    this.http.deleteProduct(id).pipe(take(1), untilDestroyed(this)).subscribe((res: {code: number; massage: string; result: Array<Product>}) => {
      console.log(res);
      this.productList = this.productList.filter(el => el.id !== id);
    });
  }

  ngOnDestroy() {
  }
}
