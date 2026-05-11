import { Component, input } from '@angular/core';
import { IMovie } from '../../../../shared/types/movie.type';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ConvertRatingPipe } from '../../../../shared/pipes/convert-rating.pipe';
import { TransformImgPathPipe } from '../../../../shared/pipes/transform-img-path.pipe';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, NgOptimizedImage, ConvertRatingPipe, TransformImgPathPipe],
  templateUrl: './movie-card.component.html',
  standalone: true,
})
export class MovieCardComponent {
  movie = input<IMovie | null>(null);
  priorityImg = input<boolean>(false);
}
