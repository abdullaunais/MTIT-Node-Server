import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {
  http: Http;
  data: any;
  serviceRootUrl: string;

  GET_MOVIES_URL = "/movies";
  ADD_MOVIE_URL = "/addmovie";
  REMOVE_MOVIE_URL = "/removemovie";

  constructor(public httpService: Http) {
    this.http = httpService;
    this.data = null;
    this.serviceRootUrl = "http://localhost:3000/api";
  }

  getAllMovies() {
    let requestUrl: string = this.serviceRootUrl + this.GET_MOVIES_URL;
    return new Promise(resolve => {
      this.http.get(requestUrl)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }

  addMovie(movie: any) {
    let body = JSON.stringify(movie);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let requestUrl = this.serviceRootUrl + this.ADD_MOVIE_URL;
    return new Promise(resolve => {
      this.http.post(requestUrl, body, options)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }

  removeMovie(id: any) {
    let requestUrl = this.serviceRootUrl + this.REMOVE_MOVIE_URL;
  }
}
