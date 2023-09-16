import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export enum NewBookStep {
  info = 'info',
  price = 'price',
}

export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStepModel;
}

export interface NewBookInfoStepModel {
  model: {
    isbn: string;
    numPages: number;
    title: string;
    author: string;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: any;
  };
}

export namespace NewBookActions {
  export class SubmitStep {
    static type = '[NEW BOOK] Submit Step';
    constructor(readonly step: NewBookStep) {}
  }

  export class SelectStep {
    static type = '[NEW BOOK] Select Step';
    constructor(readonly step: NewBookStep) {}
  }
}

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.info,
    info: {
      model: {
        isbn: '',
        numPages: 0,
        author: '',
        title: '',
      },
      dirty: false,
      status: '',
      errors: {},
    },
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

  @Action(NewBookActions.SubmitStep)
  submitStep(
    ctx: StateContext<NewBookStateModel>,
    action: NewBookActions.SubmitStep
  ) {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep,
      });
    }
  }

  @Selector()
  static infoStatus(state: NewBookStateModel) {
    return state?.info?.status;
  }

  constructor() {
    console.log('NewBookState');
  }
}
