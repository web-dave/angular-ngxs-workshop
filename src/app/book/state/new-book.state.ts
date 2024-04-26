import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookStateModel, NewBookStep } from './new-book.model';
import { NewBookSelectStep } from './new-book.actions';

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.info
  }
})
@Injectable()
export class NewBookState {
  @Action(NewBookSelectStep)
  setStep(ctx: StateContext<NewBookStateModel>, action: NewBookSelectStep) {
    ctx.setState(state => ({ ...state, step: action.step }));
  }

  @Selector()
  static currentStep(state: NewBookStateModel) {
    return state.step;
  }
}
