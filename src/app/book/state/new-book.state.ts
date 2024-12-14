import { inject, Injectable } from '@angular/core';
import { NewBookModel, NewBookStep } from './new-book.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookCreated, NewBookSelectStep, NewBookSubmitStep } from './new-book.actions';
import { concatMap, EMPTY } from 'rxjs';
import { bookNa } from '../models';
import { BookApiService } from '../book-api.service';
import { Navigate } from '@ngxs/router-plugin';

const defaults: NewBookModel = {
  step: NewBookStep.INFO,
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
    model: { price: 0 },
    dirty: false,
    status: '',
    errors: {}
  }
};

@State<NewBookModel>({
  name: 'newBook',
  defaults: defaults
})
@Injectable()
export class NewBookState {
  bookApi = inject(BookApiService);
  @Selector()
  static step(state: NewBookModel) {
    return state.step;
  }
  @Selector()
  static info(state: NewBookModel) {
    return state.info;
  }

  @Action(NewBookSelectStep)
  newBookSelectStep(ctx: StateContext<NewBookModel>, action: NewBookSelectStep) {
    ctx.setState(state => ({ ...state, step: action.step }));
  }

  @Action(NewBookSubmitStep)
  newBookSubmitStep(ctx: StateContext<NewBookModel>, action: NewBookSubmitStep) {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep
      });
    } else {
      return this.bookApi
        .create({
          ...bookNa(),
          ...state.info.model,
          price: state.price.model.price
        })
        .pipe(
          concatMap(created => {
            ctx.setState(defaults);
            return ctx.dispatch([new NewBookCreated(created), new Navigate(['/books'])]);
          })
        );
    }
    return EMPTY;
  }
}
