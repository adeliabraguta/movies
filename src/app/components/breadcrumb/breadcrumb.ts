import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

interface Crumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly crumbs = signal<Crumb[]>(this.build());

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.crumbs.set(this.build()));
  }

  private build(): Crumb[] {
    const trail: Crumb[] = [{ label: 'Home', url: '/' }];
    let route = this.activatedRoute.root;
    let url = '';

    while (route.firstChild) {
      route = route.firstChild;
      const segment = route.snapshot.url.map((s) => s.path).join('/');
      if (segment) url += '/' + segment;

      const meta = route.snapshot.data['breadcrumb'];
      if (!meta) continue;

      const label = typeof meta === 'function' ? meta(route.snapshot.data) : meta;
      if (!label || (label === 'Home' && url === '')) continue;

      trail.push({ label, url: url || '/' });
    }

    return trail;
  }
}
