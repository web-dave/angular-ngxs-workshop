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
  export class SubmitStep {
    static type = '[NEW Book] Submit';
    constructor(public step: NewBookStep) {}
  }
}

export enum NewBookStep {
  info = 'info',
  price = 'Price',
}

export interface INewBookInfoStep {
  model: {
    id: string;
    isbn: string;
    title: string;
    subtitle: string;
    cover: string;
    author: string;
    abstract: string;
    numPages: number;
    publisher: string;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: any;
  };
}
export interface INewBookPriceStep {
  model: {
    price: number;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: any;
  };
}
export interface INewBookState {
  step: NewBookStep;
  info: INewBookInfoStep;
  price: INewBookPriceStep;
}

@State<INewBookState>({
  name: 'new',
  defaults: {
    step: NewBookStep.info,
    info: {
      dirty: false,
      errors: {},
      status: 'valid',
      model: {
        title: '',
        subtitle: '',
        id: '',
        isbn: '',
        abstract: '',
        numPages: 0,
        author: '',
        publisher: '',
        cover: '',
      },
    },
    price: {
      dirty: false,
      errors: {},
      status: 'valid',
      model: {
        price: 0,
      },
    },
  },
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: INewBookState) {
    return state.step;
  }
  @Selector()
  static numpages(state: INewBookState) {
    return state.info.model.numPages;
  }

  @Action(NewBookActions.SelectStep)
  selectStep(
    ctx: StateContext<INewBookState>,
    action: NewBookActions.SelectStep
  ) {
    ctx.patchState({
      step: action.step,
    });
  }

  @Action(NewBookActions.SubmitStep)
  submitStep(
    ctx: StateContext<INewBookState>,
    action: NewBookActions.SubmitStep
  ) {
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.patchState({
        step: nextStep,
      });
    }
  }
}
