import { Component } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-movies-page',
  imports: [MovieListComponent],
  templateUrl: './movies-page.component.html',
  standalone: true,
})
export class MoviesPageComponent {}
