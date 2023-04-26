import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Selector,
  createSelector,
} from '@ngxs/store';
import { Book, books } from '../models/book';

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
})
@Injectable()
export class BookState {
  @Action(BookActions.LoadAll)
  loadAll(ctx: StateContext<BookStateModel>, action: BookActions.LoadAll) {
    const state = ctx.getState();
    ctx.setState({ ...state, entites: books });
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
