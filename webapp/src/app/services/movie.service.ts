import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from "app/config";

@Injectable()
export class MovieService {
  http: Http;
  data: any;
  serviceRootUrl: string;

  GET_MOVIES_URL = "/movies";
  ADD_MOVIE_URL = "/addmovie";
  REMOVE_MOVIE_URL = "/removemovie";
  UPDATE_MOVIE_URL = "/updatemovie"

  constructor(public httpService: Http) {
    this.http = httpService;
    this.data = null;
    this.serviceRootUrl = config.server_root;
  }

  /**
   * 
   * Get All Movies Service Interface Call
   * @returns Promise
   * 
   * @memberof MovieService
   */
  getAllMovies() {
    let requestUrl: string = this.serviceRootUrl + this.GET_MOVIES_URL;
    return new Promise(resolve => {
      this.http.get(requestUrl)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }


  /**
   * 
   * Movie Create Service Interface Call
   * @param {*} movie 
   * @returns Promise
   * 
   * @memberof MovieService
   */
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


  /**
   * 
   * Movie Delete Service Interface Call
   * @param {*} movie 
   * @returns Promise
   * 
   * @memberof MovieService
   */
  removeMovie(movie: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let requestUrl = this.serviceRootUrl + this.REMOVE_MOVIE_URL + "?movieId=" + movie['_id'];
    return new Promise(resolve => {
      this.http.delete(requestUrl, options)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }


  /**
   * 
   * Movie Update Service Interface Call
   * @param {*} movie 
   * @returns Promise
   * 
   * @memberof MovieService
   */
  updateMovie(movie: any) {
    let body = JSON.stringify(movie);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let requestUrl = this.serviceRootUrl + this.UPDATE_MOVIE_URL;
    return new Promise(resolve => {
      this.http.put(requestUrl, body, options)
        .subscribe(data => {
          resolve(data);
        }, err => {
          resolve(err);
        });
    });
  }
}
