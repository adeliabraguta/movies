import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location, NgOptimizedImage } from '@angular/common';
import { IMovie } from '../../shared/types/movie.type';
import { ConvertRatingPipe } from '../../shared/pipes/convert-rating.pipe';
import { ConvertTimePipe } from '../../shared/pipes/convert-time.pipe';
import { MovieDetailSkeleton } from '../../shared/UI/skeletons/movie-detail-skeleton/movie-detail-skeleton';
import { TransformImgPathPipe } from '../../shared/pipes/transform-img-path.pipe';

@Component({
  selector: 'app-movie-details',
  imports: [
    ConvertRatingPipe,
    ConvertTimePipe,
    DatePipe,
    MovieDetailSkeleton,
    NgOptimizedImage,
    TransformImgPathPipe,
  ],
  templateUrl: './movie-details.html',
  standalone: true,
})
export class MovieDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  movie = computed(() => this.route.snapshot.data['movie'].value() ?? ({} as IMovie));
  isLoading = computed(() => this.route.snapshot.data['movie'].isLoading());
  isError = computed(() => this.route.snapshot.data['movie'].error());

  goBack() {
    this.location.back();
  }
}
