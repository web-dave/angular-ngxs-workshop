import { inject, Injectable } from '@angular/core';
import { Book } from '../models';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { BookStateModel } from './book.model';
import { BookLoadAll } from './book.actions';
import { BookApiService } from '../book-api.service';
import { tap } from 'rxjs';

@State<BookStateModel>({
  name: 'bookState',
  defaults: {
    entities: []
  }
})
@Injectable()
export class BookState {
  private readonly service = inject(BookApiService);
  @Selector()
  static entities(state: BookStateModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BookState.entities], (books: Book[]) => books.find(book => book.isbn == isbn));
  }

  @Action(BookLoadAll)
  loadAll(ctx: StateContext<BookStateModel>) {
    return this.service.getAll().pipe(tap(books => ctx.patchState({ entities: books })));
    // ctx.setState(state => ({ ...state, entities: books }));
    // ctx.patchState({ entities: books });
  }
}
