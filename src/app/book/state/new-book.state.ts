import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookStateModel, NewBookStep } from './new-book.model';
import { NewBookSelectStep } from './new-book.action';

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.info
  }
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Action(NewBookSelectStep)
  setStep(ctx: StateContext<NewBookStateModel>, action: NewBookSelectStep) {
    ctx.patchState({ step: action.step });
  }
}
