import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';
import { BookCollectionStateModel } from './book-collection.model';
import { BookLoadAll } from './book-collection.actions';
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
    return this.service.getAll().pipe(tap(books => ctx.patchState({ entities: books })));
    // ctx.patchState({ entities: books });
  }

  @Selector()
  static entities(state: BookCollectionStateModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BookCollectionState.entities], state => state.find(book => book.isbn === isbn));
  }
}
