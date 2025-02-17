import { createBookStart } from './book-collection.actions';
import { BookCollectionSlice } from './book-collection.slice';

import { createReducer, on } from '@ngrx/store';

const initialState: BookCollectionSlice = { entities: [] };

export const bookCollectionReducer = createReducer(
  initialState,
  on(createBookStart, (state, action) => ({
    ...state,
    entities: [...state.entities, action.book]
  }))
);
