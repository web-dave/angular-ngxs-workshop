import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export class FooInterceptor implements HttpInterceptor {
  stream$$ = new Subject<HttpEvent<any>>();
  stream$ = this.stream$$.pipe();
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.stream$$.next(next.handle(req));

    return this.stream$;
  }
}
