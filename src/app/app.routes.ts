import { Routes } from '@angular/router';
import { MovieRoutingResolve } from './resolvers/movie-routing-resolve';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/movies-page/movies-page.component').then((m) => m.MoviesPageComponent),
    title: 'MoviesPage',
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./pages/movie-page/movie-page.component').then((m) => m.MoviePageComponent),
    title: 'MoviePage',
    resolve: {
      movie: MovieRoutingResolve,
    },
  },
];
