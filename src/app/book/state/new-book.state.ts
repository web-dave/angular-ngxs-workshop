import { Injectable } from '@angular/core';
import { NewBookStateModel, NewBookStep } from './new-book.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookSelectStep } from './new-book.actions';

@State<NewBookStateModel>({
  name: 'newBook',
  defaults: {
    step: NewBookStep.info
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

  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }
}
