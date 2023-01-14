import { Injectable } from '@angular/core';
import {
  Action,
  State,
  StateContext,
  Selector,
  createSelector,
} from '@ngxs/store';

export namespace NewBookAction {
  export class SelectStep {
    static readonly type = '[Books New] select step';
    constructor(public step: NewBookStep) {}
  }
}

export enum NewBookStep {
  INFO = 'info',
  PRICE = 'price',
}

export interface NewBookStateModel {
  step: NewBookStep;
}

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.INFO,
  },
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Action(NewBookAction.SelectStep)
  selectStep(
    ctx: StateContext<NewBookStateModel>,
    action: NewBookAction.SelectStep
  ) {
    ctx.patchState({
      step: action.step,
    });
  }
}
