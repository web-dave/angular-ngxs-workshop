import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Selector,
  createSelector,
} from '@ngxs/store';

import { Book } from '../models/book';
import { BookApiService } from '../services/book-api.service';
import { tap } from 'rxjs/operators';
import { NewBookState } from './new-book.state';

export interface BooksStateModel {
  entities: Book[];
}
export namespace BooksActions {
  export class LoadAll {
    static readonly type = '[BOOKS] Load All';
  }
}

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    entities: [],
  },
  children: [NewBookState],
})
@Injectable()
export class BooksState {
  @Action(BooksActions.LoadAll)
  loadAll(ctx: StateContext<BooksStateModel>, action: BooksActions.LoadAll) {
    return this.service.all().pipe(
      tap((books) =>
        ctx.patchState({
          entities: books,
        })
      )
    );
  }

  @Selector()
  static entities(state: BooksStateModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BooksState], (state: BooksStateModel) => {
      return state.entities.find((entity) => entity.isbn === isbn);
    });
  }

  constructor(private service: BookApiService) {}
}
