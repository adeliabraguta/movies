import { Component, computed, inject, input, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  standalone: true,
})
export class MovieListComponent {
  protected movieService = inject(MovieService);
  query = input<string>('');
  page = signal<number>(1);
  moviesResource = this.movieService.getMovies(this.page);
  searchMoviesResource = this.movieService.searchMovies(this.query);

  activeResource = computed(() => {
    const q = this.query().trim();
    return q !== '' ? this.searchMoviesResource : this.moviesResource;
  });

  movies = computed(() => this.activeResource().value()?.results ?? ([] as IMovie[]));
  isLoading = computed(() => this.activeResource().isLoading());
  isError = computed(() => this.activeResource().error());
}
