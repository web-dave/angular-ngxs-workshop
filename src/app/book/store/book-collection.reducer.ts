import { createEntityAdapter } from '@ngrx/entity';
import {
  createBookComplete,
  deleteBookComplete,
  loadBooksComplete,
  updateBookComplete
} from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

import { createReducer, on } from '@ngrx/store';
import { Book } from '../models';

export const booksAdapter = createEntityAdapter<Book>({ selectId: book => book.isbn });

const initialState: BookCollectionSlice = booksAdapter.getInitialState();

export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookComplete, (state, action) => booksAdapter.addOne(action.book, state)),
  on(loadBooksComplete, (state, action) => booksAdapter.setAll(action.books, state)),
  on(updateBookComplete, (state, action) => booksAdapter.upsertOne(action.book, state)),
  on(deleteBookComplete, (state, action) => booksAdapter.removeOne(action.isbn, state))
);
