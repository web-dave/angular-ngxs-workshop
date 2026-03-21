import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookStateModel, NewBookStep } from './new-book.models';
import { NewBookCreated, NewBookSelectStep, NewBookSubmitStep } from './new-book.actions';
import { Navigate } from '@ngxs/router-plugin';
import { concatMap, EMPTY } from 'rxjs';
import { bookNa } from '../models';
import { BookApiService } from '../book-api.service';

const defaults = {
  step: NewBookStep.info,
  info: {
    model: {
      title: '',
      subtitle: '',
      isbn: '',
      cover: '',
      abstract: '',
      numPages: 0,
      author: '',
      publisher: ''
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
  private readonly service = inject(BookApiService);
  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Selector()
  static info(state: NewBookStateModel) {
    return state.info;
  }

  @Action(NewBookSelectStep)
  selectStep(ctx: StateContext<NewBookStateModel>, action: NewBookSelectStep) {
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
    } else {
      const invalidStep = steps.find(step => {
        const status = state[step].status;
        return status !== 'VALID';
      });
      if (invalidStep) {
        ctx.setState({
          ...state,
          step: invalidStep
        });
      } else {
        return this.service
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
    }
    return EMPTY;
  }
}
