import { State, StateContext, Selector, Action } from '@ngxs/store';

export enum NewBookStep {
  info = 'INFO',
  price = 'PRICE',
}
export interface NewBookStateModel {
  step: NewBookStep;
}

export namespace NewBookActions {
  export class SetStep {
    static type = '[NEW BOOK] select Step';
    constructor(public step: NewBookStep) {}
  }
}

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.info,
  },
})
export class NewBookState {
  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Action(NewBookActions.SetStep)
  selectStep(
    ctx: StateContext<NewBookStateModel>,
    action: NewBookActions.SetStep
  ) {
    ctx.setState((state) => ({
      ...state,
      step: action.step,
    }));
  }
}
