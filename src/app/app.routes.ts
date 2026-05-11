import { Routes } from '@angular/router';
import { MovieRoutingResolve } from './shared/resolvers/movie-routing-resolve';
import { IMovie } from './shared/types/movie.type';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/movies/movies').then((m) => m.Movies),
    title: 'MoviesPage',
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'movies/:id',
    loadComponent: () => import('./views/movie-details/movie-details').then((m) => m.MovieDetails),
    title: 'MoviePage',
    resolve: {
      movie: MovieRoutingResolve,
    },
    data: {
      breadcrumb: (data: { movie?: IMovie }) => data.movie?.title ?? '',
    },
  },
];
