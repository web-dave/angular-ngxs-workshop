import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book-collection.slice';

export const selectBooks = createSelector(selectBookFeature, state => state.bookCollection.entities);

export const selectBook = (isbn: string) =>
  createSelector(selectBooks, books => books.find(book => book.isbn === isbn));
