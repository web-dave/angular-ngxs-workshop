import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { BookCollectionSlice } from './book-collection.slice';
import { bookCollectionReducer } from './book-collection.reducer';

export const bookFeatureName = 'books';

export interface BookState {
  bookCollection: BookCollectionSlice;
}

export const booksReducerMap: ActionReducerMap<BookState> = {
  bookCollection: bookCollectionReducer
};

export const selectBookFeature = createFeatureSelector<{
  bookCollection: BookCollectionSlice;
}>(bookFeatureName);

//createFeatureSelector<BookState>(bookFeatureName);
