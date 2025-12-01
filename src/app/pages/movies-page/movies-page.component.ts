import { Component, signal } from '@angular/core';
import { SearchMoviesComponent } from '../../components/search-movies/search-movies.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-movies-page',
  imports: [SearchMoviesComponent, MovieListComponent],
  templateUrl: './movies-page.component.html',
  standalone: true
})
export class MoviesPageComponent {
  searchQuery = signal<string>('');
}
