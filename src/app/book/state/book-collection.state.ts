import { inject, Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { BookCollectionModel } from './book-collection.model';
import { BookLoadAll, BookLoadAllError } from './book-collection.actions';
import { Book } from '../models';
import { BookApiService } from '../book-api.service';
import { tap } from 'rxjs';
import { NewBookState } from './new-book.state';

@State<BookCollectionModel>({
  name: 'bookCollection',
  defaults: {
    entities: []
  },
  children: [NewBookState]
})
@Injectable()
export class BookCollectionState {
  bookService = inject(BookApiService);

  @Selector()
  static entities(state: BookCollectionModel) {
    return state.entities;
  }

  static entity(isbn: string) {
    return createSelector([BookCollectionState.entities], (books: Book[]) => {
      return books.find(book => book.isbn === isbn);
    });
  }

  @Action(BookLoadAll)
  bookLoadAll(ctx: StateContext<BookCollectionModel>) {
    return this.bookService.getAll().pipe(
      tap({
        next: books => {
          const state = ctx.getState();
          ctx.setState({ ...state, entities: books });
        },
        error: () => {
          ctx.dispatch(new BookLoadAllError());
        }
      })
    );
  }
}
