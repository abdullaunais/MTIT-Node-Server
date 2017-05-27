import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  http: Http;
  data: any;
  serviceRootUrl: string;

  USER_AUTH_URL = "/user/auth";

  constructor(public httpService: Http) {
    this.http = httpService;
    this.data = null;
    this.serviceRootUrl = "http://localhost:3000/api";
  }

  authenticateUser(user: any) {
    let requestUrl: string = this.serviceRootUrl + this.USER_AUTH_URL;
    return new Promise(resolve => {
      this.http.get(requestUrl)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }
}
