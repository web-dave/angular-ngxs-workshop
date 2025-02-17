import { createBookComplete, loadBooksComplete, updateBookComplete } from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

import { createReducer, on } from '@ngrx/store';

const initialState: BookCollectionSlice = {
  entities: []
};

export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookComplete, (state, action) => ({
    ...state,
    entities: [...state.entities, action.book]
  })),
  on(loadBooksComplete, (state, action) => ({
    ...state,
    entities: action.books
  })),
  on(updateBookComplete, (state, action) => {
    const books = state.entities.map(book => {
      if (book.isbn !== action.book.isbn) {
        return book;
      } else {
        return action.book;
      }
    });
    return {
      ...state,
      entities: books
    };
  })
);
