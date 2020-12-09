import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Client} from '../shared/interfaces/client';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clientList: Client[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getClientsList().subscribe((res: any) => {
      this.clientList = res.result;
    });
  }

}
