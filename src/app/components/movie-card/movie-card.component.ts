import { Component, input } from '@angular/core';
import { IMovie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { IconStarComponent } from '../../shared/ui/icons/icon-star/icon-star.component';
import { ConvertRatingPipe } from '../../shared/pipes/convert-rating.pipe';
import { TransformImgPathPipe } from '../../shared/pipes/transform-img-path.pipe';

@Component({
  selector: 'app-movie-card',
  imports: [
    RouterLink,
    NgOptimizedImage,
    IconStarComponent,
    ConvertRatingPipe,
    TransformImgPathPipe,
  ],
  templateUrl: './movie-card.component.html',
  standalone: true,
})
export class MovieCardComponent {
  movie = input<IMovie | null>(null);
  priorityImg = input<boolean>(false);
}
