import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmRhNmMwYmQ3ZDI4ZmNmNTQ3NGM1ZjhmNDQ1YWU3NCIsIm5iZiI6MTc2NDMzMjIyNS4zNTY5OTk5LCJzdWIiOiI2OTI5OTJjMWQyYmEwZDg1NjllYWE5MmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7YlT_ElLhAilFcmqu8gt65LF1vhHllVli9SIv-eq-pw';

  const request = req.clone({
    headers: req.headers
      .append('accept', 'application/json')
      .append('Authorization', `Bearer ${token}`),
  });

  return next(request);
}
