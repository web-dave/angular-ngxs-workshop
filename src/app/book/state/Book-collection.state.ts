import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';
import { BookCollectionStateModel } from './book-collection.model';
import { BookLoadAll } from './book-collection.actions';
import { BookApiService } from '../book-api.service';
import { tap } from 'rxjs';

@State<BookCollectionStateModel>({
  name: 'BookCollection',
  defaults: {
    entities: []
  }
})
@Injectable()
export class BookCollectionState {
  service = inject(BookApiService);
  @Action(BookLoadAll)
  booksLoadAll(ctx: StateContext<BookCollectionStateModel>, action: BookLoadAll) {
    return this.service.getAll().pipe(
      tap(books => {
        ctx.setState(state => ({ ...state, entities: books }));
      })
    );
  }

  @Selector()
  static entities(state: BookCollectionStateModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BookCollectionState], (state: BookCollectionStateModel) => {
      return state.entities.find(entity => entity.isbn === isbn);
    });
  }
}
