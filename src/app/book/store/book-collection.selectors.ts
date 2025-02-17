import { createSelector } from '@ngrx/store';
import { selectBookFeature } from './book-collection.slice';

export const selectBooks = createSelector(selectBookFeature, state => state.bookCollection.entities);
