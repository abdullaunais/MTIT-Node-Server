import { Component } from '@angular/core';
import { MovieService } from "app/services/movie.service";
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'movielist',
  styleUrls: ['./movielist.scss'],
  templateUrl: './movielist.html',
  providers: [MovieService]
})
export class MovieList {
  movieService: MovieService;
  movies: Array<any> = [];

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    pager: {
      display: true,
      perPage: 10
    },
    mode: 'inline',
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      description: {
        title: 'Details',
        type: 'string'
      },
      year: {
        title: 'Year',
        type: 'number'
      },
      genre: {
        title: 'Genre',
        type: 'string'
      },
      rating: {
        title: 'Rating',
        type: 'number'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(movieService: MovieService) {
    this.movieService = movieService;
    this.initialize();
  }

  onCreateConfirm(event): void {
    console.log(event);
    if (window.confirm('Add Movie?')) {
      this.movieService.addMovie(event.newData).then((result) => {
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.movieService.removeMovie(event.data).then((result) => {
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  onUpdateConfirm(event): void {
    if (window.confirm('Save Changes?')) {
      this.movieService.updateMovie(event.data, event.newData).then((result) => {
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  initialize() {
    this.movieService.getAllMovies().then((movieData) => {
      if (movieData) {
        let json = JSON.stringify(movieData);
        this.movies = JSON.parse(json);
        this.source.load(this.movies);
      }
    });
  }
}
