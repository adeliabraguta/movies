import { Component, effect, signal } from '@angular/core';
import { SearchMoviesComponent } from '../../components/search-movies/search-movies.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { IconMoonComponent } from '../../shared/ui/icons/icon-moon/icon-moon.component';
import { IconSunComponent } from '../../shared/ui/icons/icon-sun/icon-sun.component';

@Component({
  selector: 'app-movies-page',
  imports: [SearchMoviesComponent, MovieListComponent, IconMoonComponent, IconSunComponent],
  templateUrl: './movies-page.component.html',
  standalone: true,
})
export class MoviesPageComponent {
  searchQuery = signal<string>('');
  darkMode = signal(false);

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      document.documentElement.classList.toggle('dark', isDark);
    });
  }

  toggleDarkMode() {
    this.darkMode.update((dark) => !dark);
  }
}
