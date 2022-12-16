import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookApiService } from '../services/book-api.service';

export namespace BooksActions {
  export class LoadAll {
    static readonly type = '[Books] Load All';
  }
}

export interface IBookState {
  entities: Book[];
}

@State<IBookState>({
  name: 'books',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class BookState {
  @Selector()
  static entieties(state: IBookState): Book[] {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BookState], (state: IBookState) =>
      state.entities.find((book) => book.isbn === isbn)
    );
  }

  @Action(BooksActions.LoadAll)
  loadAll(ctx: StateContext<IBookState>) {
    return this.api.all().pipe(
      tap((booksFromApi) =>
        ctx.setState((state) => {
          return {
            ...state,
            entities: booksFromApi,
          };
        })
      )
    );
  }

  constructor(private api: BookApiService) {}
}
