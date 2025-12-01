import { Component, inject, signal } from '@angular/core';
import { SearchMoviesComponent } from '../../components/search-movies/search-movies.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { IconMoonComponent } from '../../shared/ui/icons/icon-moon/icon-moon.component';
import { IconSunComponent } from '../../shared/ui/icons/icon-sun/icon-sun.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-movies-page',
  imports: [SearchMoviesComponent, MovieListComponent, IconMoonComponent, IconSunComponent],
  templateUrl: './movies-page.component.html',
  standalone: true
})
export class MoviesPageComponent {
  private themeService = inject(ThemeService);

  searchQuery = signal<string>('');

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
