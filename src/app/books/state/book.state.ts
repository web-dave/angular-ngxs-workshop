import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Selector,
  createSelector,
} from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { Book, books } from '../models/book';
import { BookApiService } from '../services/book-api.service';
import { NewBookActions } from './new-book/new-book.actions';
import { NewBookState } from './new-book/new-book.state';

export namespace BookActions {
  export class LoadAll {
    static type = '[BOOKS] Load All';
  }
}

export interface BookStateModel {
  entites: Book[];
}

@State<BookStateModel>({
  name: 'books',
  defaults: { entites: [] },
  children: [NewBookState],
})
@Injectable()
export class BookState {
  constructor(private service: BookApiService) {}

  @Action(BookActions.LoadAll)
  loadAll(ctx: StateContext<BookStateModel>, action: BookActions.LoadAll) {
    return this.service.all().pipe(
      tap((data) => {
        ctx.setState((state) => ({
          ...state,
          entites: data,
        }));
      })
    );
    // const state = ctx.getState();
    // ctx.setState({ ...state, entites: books });
  }

  @Action(NewBookActions.Created)
  create(ctx: StateContext<BookStateModel>, action: NewBookActions.Created) {
    ctx.setState(
      patch({
        entites: append([action.book]),
      })
    );
  }

  @Selector()
  static bookState(state: BookStateModel) {
    return state;
  }
  @Selector()
  static entities(state: BookStateModel) {
    return state.entites;
  }

  static entity(isbn: string) {
    return createSelector([BookState], (state: BookStateModel) =>
      state.entites.find((b) => b.isbn === isbn)
    );
  }
}
