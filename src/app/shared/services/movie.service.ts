import { Injectable, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { IMovie, IMoviesList } from '../types/movie.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly resourceUrl = 'https://api.themoviedb.org/3';

  getMovies(page: Signal<number>, query: Signal<string>) {
    return httpResource<IMoviesList>(() => {
      const q = query().trim();
      const params: Record<string, string> = { page: `${page()}` };
      if (q) params['query'] = q;

      return {
        method: 'GET',
        url: `${this.resourceUrl}/${q ? 'search/movie' : 'movie/popular'}`,
        params,
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
