import { Injectable } from '@angular/core';
import {
  State,
  Action,
  StateContext,
  createSelector,
  Selector,
  ofActionSuccessful,
} from '@ngxs/store';
import { Book } from '../models/book';
import { BooksActions } from './book.actions';
import { BookApiService } from '../services/book-api.service';
import { tap } from 'rxjs/operators';

export namespace NewBookActions {
  export class SelectStep {
    static type = '[NEW Book] select step';
    constructor(public step: NewBookStep) {}
  }
}

export enum NewBookStep {
  info = 'info',
  price = 'Price',
}

export interface INewBookState {
  step: NewBookStep;
}

@State<INewBookState>({
  name: 'new',
  defaults: {
    step: NewBookStep.info,
  },
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: INewBookState) {
    return state.step;
  }

  @Action(NewBookActions.SelectStep)
  selectStep(
    ctx: StateContext<INewBookState>,
    action: NewBookActions.SelectStep
  ) {
    ctx.setState((state) => ({
      ...state,
      step: action.step,
    }));
  }
}
