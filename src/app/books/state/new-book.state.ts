import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export enum NewBookStep {
  info = 'info',
  price = 'price',
}

export interface NewBookStateModel {
  step: NewBookStep;
}

export namespace NewBookActions {
  export class SelectStep {
    static type = '[NEW BOOK] Select Step';
    constructor(readonly step: NewBookStep) {}
  }
}

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.info,
  },
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Action(NewBookActions.SelectStep)
  selectStep(
    ctx: StateContext<NewBookStateModel>,
    action: NewBookActions.SelectStep
  ) {
    ctx.setState((state) => ({
      ...state,
      step: action.step,
    }));
  }
}
