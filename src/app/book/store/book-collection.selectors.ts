import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book.feature';
import { booksAdapter } from './book-collection.reducer';
import { selectRouteParam } from './router.selectors';
import { Book } from '../models';

export const selectBookCollection = createSelector(selectBookFeature, state => state.bookCollection);

const { selectAll, selectEntities } = booksAdapter.getSelectors(selectBookCollection);

export const selectBooks = selectAll;

export const selectBook = createSelector(selectEntities, selectRouteParam('isbn'), (books, isbn) =>
  !!isbn ? books[isbn] : ({} as Book)
);
// export const selectBook2 = createSelector(selectEntities, selectRouteParam('isbn'), (books, isbn) => {
//   if (!!isbn) return books[isbn];
// });
