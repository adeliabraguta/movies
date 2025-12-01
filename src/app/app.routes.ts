import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/movies-page/movies-page.component').then((m) => m.MoviesPageComponent),
    title: 'MoviesPage',
  },
];
