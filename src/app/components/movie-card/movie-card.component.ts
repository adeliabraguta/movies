import { Component, computed, input } from '@angular/core';
import { IMovie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { IconStarComponent } from '../../shared/ui/icons/icon-star/icon-star.component';
import { ConvertRatingPipe } from '../../shared/pipes/convert-rating.pipe';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, NgOptimizedImage, IconStarComponent, ConvertRatingPipe],
  templateUrl: './movie-card.component.html',
  standalone: true,
})
export class MovieCardComponent {
  movie = input<IMovie | null>(null);

  posterSrc = computed(() =>
    this.movie()?.poster_path
      ? 'https://image.tmdb.org/t/p/original/' + this.movie()?.poster_path
      : 'assets/not-found.jpg',
  );
}
