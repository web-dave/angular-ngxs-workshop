import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { BookCollectionStateModel, books } from './book-collection.model';
import { BookLoadAll } from './book-collection.actions';

@State<BookCollectionStateModel>({
  name: 'BookCollection',
  defaults: {
    entities: []
  }
})
@Injectable()
export class BookCollectionState {
  @Action(BookLoadAll)
  booksLoadAll(ctx: StateContext<BookCollectionStateModel>, action: BookLoadAll) {
    ctx.setState(state => ({ ...state, entities: books }));
  }
}
