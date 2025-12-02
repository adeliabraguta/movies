import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { IMovie, IMoviesList } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  protected http = inject(HttpClient);
  protected resourceUrl = 'https://api.themoviedb.org/3';

  getMovies(page: Signal<number>) {
    return httpResource<IMoviesList>(() => {
      return {
        method: 'GET',
        url: `${this.resourceUrl}/movie/popular`,
        params: { page: page().toString() },
      };
    });
  }

  searchMovies(page: Signal<number>, query: Signal<string>) {
    return httpResource<IMoviesList>(() => {
      if (!query()) {
        return;
      }
      return {
        method: 'GET',
        url: `${this.resourceUrl}/search/movie`,
        params: { page: page().toString(), query: query() },
      };
    });
  }

  getMovieById(id: number) {
    return httpResource<IMovie>(() => {
      return {
        method: 'GET',
        url: `${this.resourceUrl}/movie/${id}`,
      };
    });
  }
}
