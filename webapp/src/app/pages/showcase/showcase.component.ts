import { Component } from '@angular/core';
import { MovieService } from "app/services/movie.service";

@Component({
  selector: 'showcase',
  styleUrls: ['./showcase.scss'],
  templateUrl: './showcase.html',
  providers: [MovieService]
})
export class Showcase {
  movieService: MovieService;
  movies: Array<any> = [];
  constructor(movieService: MovieService) {
    this.movieService = movieService;
    this.initialize();
  }

  initialize() {
    this.movieService.getAllMovies().then((movieData) => {
      if (movieData) {
        let json = JSON.stringify(movieData);
        this.movies = JSON.parse(json);
      }
    });
  }
}
