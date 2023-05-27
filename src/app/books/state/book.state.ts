import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  createSelector,
  Selector,
  ofActionSuccessful,
} from '@ngxs/store';
import { Book } from '../models/book';
import { BooksActions } from './book.actions';
import { BookApiService } from '../services/book-api.service';
import { tap } from 'rxjs/operators';
import { NewBookActions, NewBookState } from './new-book.state';

export interface IBooksState {
  entities: Book[];
}

@State<IBooksState>({
  name: 'BookFeature',
  defaults: {
    entities: [],
  },
  children: [NewBookState],
})
@Injectable()
export class BooksState {
  @Selector()
  static entities(state: IBooksState) {
    return state.entities;
  }

  constructor(private service: BookApiService) {}

  static entity(isbn: string) {
    return createSelector([BooksState], (state: IBooksState) => {
      return state.entities.find((entity) => entity.isbn === isbn);
    });
  }

  @Action(BooksActions.LoadAll)
  hurz(ctx: StateContext<IBooksState>, action: BooksActions.LoadAll) {
    return this.service.all().pipe(
      tap((data) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          entities: data,
        });
      })
    );
  }

  @Action(NewBookActions.SubmitStep)
  createBook(ctx: StateContext<IBooksState>, action: BooksActions.LoadAll) {
    // console.log(ctx.getState());
    //   else {
    //     const book: Book = {
    //       ...ctx.getState().info.model,
    //       price: String(ctx.getState().price.model.price),
    //     };
    // this.service.create(book).pipe();
  }
}
