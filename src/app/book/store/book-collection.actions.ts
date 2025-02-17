import { createAction, props } from '@ngrx/store';
import { Book } from '../models';

export const createBookStart = createAction('[Book] creat Book Start', props<{ book: Book }>());
export const createBookComplete = createAction('[Book] creat Book Complete', props<{ book: Book }>());

export const updateBookStart = createAction('[Book] update Book Start', props<{ book: Book }>());
export const updateBookComplete = createAction('[Book] update Book Complete', props<{ book: Book }>());

export const deleteBookStart = createAction('[Book] delete Book Start', props<{ isbn: string }>());
export const deleteBookComplete = createAction('[Book] delete Book Complete', props<{ isbn: string }>());

export const loadBooksStart = createAction('[Book] load Books Start');
export const loadBooksComplete = createAction('[Book] load Books Complete', props<{ books: Book[] }>());
