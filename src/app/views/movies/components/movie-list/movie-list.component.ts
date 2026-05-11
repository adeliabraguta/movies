import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';
import { IMovie, IMoviesList } from '../../../../shared/types/movie.type';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieCardSkeleton } from '../../../../shared/UI/skeletons/movie-card-skeleton/movie-card-skeleton';

const SKELETON_COUNT = 8;

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent, MovieCardSkeleton],
  templateUrl: './movie-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  private readonly movieService = inject(MovieService);
  private readonly scrollAnchor = viewChild<ElementRef<HTMLElement>>('scrollAnchor');
  protected readonly skeletonCount = Array(SKELETON_COUNT);

  query = input<string>('');
  protected page = signal(1);

  protected readonly resource = this.movieService.getMovies(this.page, this.query);
  protected readonly isLoading = computed(() => this.resource.isLoading());
  protected readonly isError = computed(() => !!this.resource.error());

  private readonly canLoadMore = computed(() => {
    const value = this.resource.value();
    if (!value) return false;

    return value.page < value.total_pages;
  });

  constructor() {
    effect((onCleanup) => {
      const anchor = this.scrollAnchor();
      if (!anchor) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && this.canLoadMore() && !this.isLoading()) {
          this.loadMore();
        }
      });
      observer.observe(anchor.nativeElement);

      onCleanup(() => observer.disconnect());
    });
  }

  movies = linkedSignal<IMoviesList | undefined, IMovie[]>({
    source: () => this.resource.value(),
    computation: (resourceValue, previous) => {
      const previousMovies = previous?.value ?? [];

      if (!resourceValue?.results) return previousMovies;

      if (this.page() === 1) {
        return resourceValue.results;
      }

      return [...previousMovies, ...resourceValue.results];
    },
  });

  private loadMore() {
    this.page.update((p) => p + 1);
  }
}
