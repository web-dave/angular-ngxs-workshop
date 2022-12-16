import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export enum NewBookStep {
  info = 'info',
  price = 'price',
}

export interface INewBookState {
  step: NewBookStep;
}

export namespace NewBookActions {
  export class SelectStep {
    static readonly type = '[New Books] Select Step';
    constructor(readonly step: NewBookStep) {}
  }
}

@State<INewBookState>({
  name: 'new',
  defaults: {
    step: NewBookStep.info,
  },
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: INewBookState) {
    return state.step;
  }

  @Action(NewBookActions.SelectStep)
  selectStep(
    ctx: StateContext<INewBookState>,
    action: NewBookActions.SelectStep
  ) {
    ctx.setState((state) => ({
      ...state,
      step: action.step,
    }));
  }
}
