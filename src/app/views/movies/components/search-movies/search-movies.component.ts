import { Component, effect, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-movies',
  imports: [FormsModule],
  templateUrl: './search-movies.component.html',
  standalone: true,
})
export class SearchMoviesComponent {
  searchEmitter = output<string>();
  query = model<string>('');

  constructor() {
    effect(() => {
      this.searchEmitter.emit(this.query());
    });
  }

  onSearch() {
    this.searchEmitter.emit(this.query());
  }
}
