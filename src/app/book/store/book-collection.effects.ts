import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createBookComplete,
  createBookStart,
  deleteBookComplete,
  deleteBookStart,
  loadBooksComplete,
  loadBooksStart,
  updateBookComplete,
  updateBookStart
} from './book-collection.actions';
import { exhaustMap, map } from 'rxjs';
import { BookApiService } from '../book-api.service';

@Injectable()
export class BookCollectionEffects {
  actions$ = inject(Actions);
  service = inject(BookApiService);

  load = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooksStart),
      exhaustMap(() => this.service.getAll()),
      map(books => loadBooksComplete({ books }))
    )
  );

  create = createEffect(() =>
    this.actions$.pipe(
      ofType(createBookStart),
      exhaustMap(action => this.service.create(action.book)),
      map(book => createBookComplete({ book }))
    )
  );
  update = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBookStart),
      exhaustMap(action => this.service.update(action.book.isbn, action.book)),
      map(book => updateBookComplete({ book }))
    )
  );
  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBookStart),
      exhaustMap(action => this.service.delete(action.isbn)),
      map(book => deleteBookComplete({ isbn: book.isbn }))
    )
  );
}
