import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from "app/config";


@Injectable()
export class UserService {
  http: Http;
  data: any;
  serviceRootUrl: string;

  USER_AUTH_URL = "/user/auth";
  USER_REGISTER_URL = "/user/register"

  constructor(public httpService: Http) {
    this.http = httpService;
    this.data = null;
    this.serviceRootUrl = config.server_root;
  }


  /**
   * 
   * Login Service Interface Call
   * @param {string} email 
   * @param {*} password 
   * @returns Promise
   * 
   * @memberof UserService
   */
  authUser(email: string, password: any) {
    let credentials = {
      email: email,
      password: password
    };
    let body = JSON.stringify(credentials);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.USER_AUTH_URL;
    return new Promise(resolve => {
      this.http.post(requestUrl, body, options)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }


  /**
   * 
   * Regitration Service Interface Call
   * @param {*} user 
   * @returns Promise
   * 
   * @memberof UserService
   */
  registerUser(user: any) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let requestUrl: string = this.serviceRootUrl + this.USER_REGISTER_URL;
    return new Promise(resolve => {
      this.http.post(requestUrl, body, options)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }
}
