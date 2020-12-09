import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../shared/interfaces/product';
import {HttpService} from '../../shared/services/http.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  item: Product;
  imgChangeData: any;

  private itemId: number;

  constructor(private http: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.queryParams.productId;
    this.http.getProductInfo(this.itemId).pipe(untilDestroyed(this)).subscribe((res: {code: number; massage: string; result: Product}) => {
      console.log(res);
      this.item = res.result;
    });
  }

  onSaveChanges() {
    this.http.updateProduct(this.item).pipe(untilDestroyed(this)).subscribe((res: {code: number; massage: string; result: Array<Product>}) => {
      console.log(res);
    });
  }

  onChoseImg(e) {
    const file = e.target.files[0];
    this.imgChangeData = new FormData();
    this.imgChangeData.append('file', file);
    this.imgChangeData.append('id', this.item.id.toString());
  }

  onSaveImg() {
    this.http.setProductImg(this.itemId, this.imgChangeData).pipe(untilDestroyed(this)).subscribe((res: any) => {
      this.item.img = res.result.img;
    });
  }

  getImg(imgCode: string): string {
    return this.http.getImgUrl(imgCode);
  }

  ngOnDestroy() {
  }
}
