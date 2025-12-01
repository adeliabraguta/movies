import { Component } from '@angular/core';
import { MovieDetailComponent } from '../../components/movie-detail/movie-detail.component';

@Component({
  selector: 'app-movie-page',
  imports: [MovieDetailComponent],
  templateUrl: './movie-page.component.html',
  standalone: true,
})
export class MoviePageComponent {}
