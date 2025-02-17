import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book.feature';
import { booksAdapter } from './book-collection.reducer';

export const selectBookCollection = createSelector(selectBookFeature, state => state.bookCollection);

const { selectAll, selectEntities } = booksAdapter.getSelectors(selectBookCollection);

export const selectBooks = selectAll;

export const selectBook = (isbn: string) => createSelector(selectEntities, books => books[isbn]);
