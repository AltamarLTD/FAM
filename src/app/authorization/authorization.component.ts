import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  userData: {
    username: string,
    password: string
  } = {
    username: 'admin',
    password: '123'
  };

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  logIn() {
    this.authService.login(this.userData.username, this.userData.password).subscribe((res) => {
      console.log('res log in', this.authService.currentUser)
      this.router.navigate(['/product-list']);
    });
  }
}
