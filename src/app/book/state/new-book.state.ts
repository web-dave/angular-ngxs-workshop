import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookStateModel, NewBookStep } from './new-book.model';
import { AddBook, NewBookSelectStep, NewBookSubmitStep } from './new-book.actions';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { of, tap } from 'rxjs';
const defaults: NewBookStateModel = {
  step: NewBookStep.info,
  info: {
    model: {
      isbn: '',
      title: '',
      subtitle: '',
      author: '',
      abstract: '',
      cover: '',
      numPages: 0
    },
    dirty: false,
    status: '',
    errors: {}
  },
  price: {
    model: {
      price: 0
    },
    dirty: false,
    status: '',
    errors: {}
  }
};

@State<NewBookStateModel>({
  name: 'new',
  defaults: defaults
})
@Injectable()
export class NewBookState {
  service = inject(BookApiService);
  @Action(NewBookSelectStep)
  setStep(ctx: StateContext<NewBookStateModel>, action: NewBookSelectStep) {
    ctx.setState(state => ({ ...state, step: action.step }));
  }

  @Action(NewBookSubmitStep)
  submitStep(ctx: StateContext<NewBookStateModel>, action: NewBookSubmitStep) {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep
      });
      return of(null);
    } else {
      const book = { ...state.info.model, ...state.price.model } as Book;
      return this.service.create(book).pipe(tap(book => ctx.dispatch(new AddBook(book))));
    }
  }

  @Selector()
  static currentStep(state: NewBookStateModel) {
    return state.step;
  }

  @Selector()
  static info(state: NewBookStateModel) {
    return state.info;
  }
}
