import { Component, inject, signal } from '@angular/core';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-movies',
  imports: [SearchMoviesComponent, MovieListComponent],
  templateUrl: './movies.html',
  standalone: true,
})
export class Movies {
  private readonly themeService = inject(ThemeService);

  searchQuery = signal<string>('');

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
