import { Component, computed, inject, signal } from '@angular/core';
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
  page = signal<number>(1);
  moviesResource = this.movieService.getMovies(this.page);

  movies = computed(() => this.moviesResource.value()?.results ?? ([] as IMovie[]));
  isLoading = computed(() => this.moviesResource.isLoading());
  isError = computed(() => this.moviesResource.error());
}
