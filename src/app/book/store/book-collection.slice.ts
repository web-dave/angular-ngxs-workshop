import { createFeatureSelector } from '@ngrx/store';
import { Book } from '../models';

export const bookFeatureName = 'books';

export interface BookCollectionSlice {
  entities: ReadonlyArray<Book>;
}

export const selectBookFeature = createFeatureSelector<{ bookCollection: BookCollectionSlice }>(bookFeatureName);
