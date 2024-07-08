import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';
import { BookCollectionStateModel } from './book-collection.model';
import { BookLoadAll } from './book-collection.actions';
import { Book } from '../models';
import { BookApiService } from '../book-api.service';
import { tap } from 'rxjs';
import { NewBookState } from './new-book.state';

@State<BookCollectionStateModel>({
  name: 'bookCollection',
  defaults: {
    entities: []
  },
  children: [NewBookState]
})
@Injectable()
export class BookCollectionState {
  service = inject(BookApiService);

  @Action(BookLoadAll)
  loadAll(ctx: StateContext<BookCollectionStateModel>, action: BookLoadAll) {
    return this.service.getAll().pipe(
      tap(data => {
        ctx.setState(state => ({ ...state, entities: data }));
      })
    );
  }

  @Selector()
  static entities(state: BookCollectionStateModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BookCollectionState.entities], (books: Book[]) => books.find(book => book.isbn === isbn));
  }
}
