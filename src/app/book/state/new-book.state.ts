import { Injectable } from '@angular/core';
import { NewBookModel, NewBookStep } from './new-book.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookSelectStep, NewBookSubmitStep } from './new-book.actions';

@State<NewBookModel>({
  name: 'newBook',
  defaults: {
    step: NewBookStep.INFO,
    info: {
      model: {
        abstract: '',
        author: '',
        cover: '',
        isbn: '',
        title: '',
        subtitle: '',
        numPages: 0
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
    }
  }
}
