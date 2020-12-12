import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {Product} from '../../shared/interfaces/product';
import {HttpService} from '../../shared/services/http.service';
import {take} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ResponseCode} from '../../shared/enums/response-code.enum';

@UntilDestroy()
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  item: Product =
    {
    country: null,
    date: null,
    description: null,
    img: 'DEFAULT.jpg',
    name: null,
    pack: null,
    priceKg: null,
    pricePack: null
  };

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  onAddItem() {
    this.http.addProduct(this.item).pipe(take(1)).subscribe((res: {code: number; massage: string; result: Array<Product>}) => {
      if (res.code === ResponseCode.Success) {
        this.router.navigate(['./product-list']);
      }
    });
  }

  ngOnDestroy() {
  }
}
