import { Component, computed, inject } from '@angular/core';
import { IMovie } from '../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { IconStarComponent } from '../../shared/ui/icons/icon-star/icon-star.component';
import { IconClockComponent } from '../../shared/ui/icons/icon-clock/icon-clock.component';
import { Location } from '@angular/common';
import { IconBackComponent } from '../../shared/ui/icons/icon-back/icon-back.component';
import { ConvertTimePipe } from '../../shared/pipes/convert-time.pipe';
import { MovieDetailSkeletonComponent } from '../../shared/ui/skeletons/movie-detail-skeleton/movie-detail-skeleton.component';
import { ConvertRatingPipe } from '../../shared/pipes/convert-rating.pipe';

@Component({
  selector: 'app-movie-detail',
  imports: [
    NgOptimizedImage,
    IconStarComponent,
    DatePipe,
    IconClockComponent,
    IconBackComponent,
    ConvertTimePipe,
    MovieDetailSkeletonComponent,
    ConvertRatingPipe,
  ],
  templateUrl: './movie-detail.component.html',
  standalone: true,
})
export class MovieDetailComponent {
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  movie = computed(() => this.route.snapshot.data['movie'].value() ?? ({} as IMovie));
  isLoading = computed(() => this.route.snapshot.data['movie'].isLoading());
  isError = computed(() => this.route.snapshot.data['movie'].error());

  posterSrc = computed(() =>
    this.movie()?.poster_path
      ? 'https://image.tmdb.org/t/p/original/' + this.movie()?.poster_path
      : 'assets/not-found.jpg',
  );

  goBack() {
    this.location.back();
  }
}
