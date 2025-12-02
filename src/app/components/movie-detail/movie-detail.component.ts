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
import { TransformImgPathPipe } from '../../shared/pipes/transform-img-path.pipe';

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
    TransformImgPathPipe,
  ],
  templateUrl: './movie-detail.component.html',
  standalone: true,
})
export class MovieDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  movie = computed(() => this.route.snapshot.data['movie'].value() ?? ({} as IMovie));
  isLoading = computed(() => this.route.snapshot.data['movie'].isLoading());
  isError = computed(() => this.route.snapshot.data['movie'].error());

  goBack() {
    this.location.back();
  }
}
