import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const request = req.clone({
    headers: req.headers
      .append('accept', 'application/json')
      .append('Authorization', `Bearer ${environment.tmdbToken}`),
  });

  return next(request);
}
