import { Injectable } from '@angular/core';
import { NewBookStateModel, NewBookStep } from './new-book.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookSelectStep, NewBookSubmitStep } from './new-book.actions';

const infoDefault = {
  model: {
    title: '',
    subtitle: '',
    author: '',
    abstract: '',
    isbn: '',
    cover: '',
    numPages: 0
  },
  status: 'INVALID',
  dirty: false
};

@State<NewBookStateModel>({
  name: 'newBook',
  defaults: {
    step: NewBookStep.info,
    info: infoDefault
  }
})
@Injectable()
export class NewBookState {
  @Action(NewBookSelectStep)
  setStep(ctx: StateContext<NewBookStateModel>, action: NewBookSelectStep) {
    ctx.setState(state => ({
      ...state,
      step: action.step
    }));
  }

  @Action(NewBookSubmitStep)
  submitStep(ctx: StateContext<NewBookStateModel>, action: NewBookSubmitStep) {
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState(state => ({
        ...state,
        step: nextStep
      }));
    }
  }

  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }
}
