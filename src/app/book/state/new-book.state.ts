import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookStateModel, NewBookStep } from './new-book.models';
import { NewBookSelectStep, NewBookSubmitStep } from './new-book.actions';

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
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
  }
})
@Injectable()
export class NewBookState {
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
    }
  }
}
