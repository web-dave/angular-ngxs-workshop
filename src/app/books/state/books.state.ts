import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { Book } from '../models/book';

export interface BookStateModel {
  entities: Book[];
}
export namespace BooksActions {
  export class LoadAll {
    static readonly type = '[BOOKS] Load All';
    constructor(public books: Book[]) {}
  }
}

export interface BookStateModel {
  entities: Book[];
}

@State<BookStateModel>({
  name: 'books',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class BookState {
  @Action(BooksActions.LoadAll)
  loadAll(ctx: StateContext<BookStateModel>, action: BooksActions.LoadAll) {
    ctx.patchState({
      entities: action.books,
    });
  }
}
