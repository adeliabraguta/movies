import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
  ViewChild,
} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie, IMoviesList } from '../../models/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieCardSkeletonComponent } from '../../shared/ui/skeletons/movie-card-skeleton/movie-card-skeleton.component';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent, MovieCardSkeletonComponent],
  templateUrl: './movie-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements AfterViewInit {
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;
  private readonly movieService = inject(MovieService);

  query = input<string>('');
  private listPage = signal(1);
  private searchPage = signal(1);

  private pageSize = 20;

  private readonly moviesResource = this.movieService.getMovies(this.listPage);
  private readonly searchMoviesResource = this.movieService.searchMovies(
    this.searchPage,
    this.query,
  );

  private readonly activeResource = computed(() => {
    const q = this.query().trim();
    return q ? this.searchMoviesResource : this.moviesResource;
  });

  private readonly currentPage = computed(() => {
    const q = this.query().trim();
    return q ? this.searchPage() : this.listPage();
  });

  isLoading = computed(() => this.activeResource().isLoading());
  isError = computed(() => this.activeResource().error());

  movies = linkedSignal<IMoviesList | undefined, IMovie[]>({
    source: () => this.activeResource().value(),
    computation: (resourceValue, previous) => {
      const previousMovies = previous?.value ?? [];

      if (!resourceValue?.results) return previousMovies;

      if (this.currentPage() === 1) {
        return resourceValue.results;
      }

      return [...previousMovies, ...resourceValue.results];
    },
  });

  canLoadMore = computed(() => {
    const movies = this.activeResource().value();
    if (!movies) return false;

    return movies.results.length === this.pageSize;
  });

  loadMore() {
    const q = this.query().trim();

    if (q) {
      this.searchPage.update((p) => p + 1);
    } else {
      this.listPage.update((p) => p + 1);
    }
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;
      if (isVisible && this.canLoadMore() && !this.isLoading()) {
        this.loadMore();
      }
    });

    observer.observe(this.scrollAnchor.nativeElement);
  }

  constructor() {
    effect(() => {
      const q = this.query().trim();

      if (q) {
        this.searchPage.set(1);
      } else {
        this.listPage.set(1);
      }
    });
  }
}
