import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  Selector,
  createSelector,
} from '@ngxs/store';

import { Book } from '../models/book';

export interface BooksStateModel {
  entities: Book[];
}
export namespace BooksActions {
  export class LoadAll {
    static readonly type = '[BOOKS] Load All';
    constructor(public books: Book[]) {}
  }
}

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class BooksState {
  @Action(BooksActions.LoadAll)
  loadAll(ctx: StateContext<BooksStateModel>, action: BooksActions.LoadAll) {
    ctx.patchState({
      entities: action.books,
    });
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
}
