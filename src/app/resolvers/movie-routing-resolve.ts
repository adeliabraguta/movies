import { inject } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRouteSnapshot } from '@angular/router';

export const MovieRoutingResolve = (route: ActivatedRouteSnapshot) => {
  const movieService = inject(MovieService);
  const id = Number(route.paramMap.get('id'));

  return movieService.getMovieById(id);
};
