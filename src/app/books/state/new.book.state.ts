import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export enum NewBookStep {
  INFO = 'info',
  PRICE = 'price',
}

export interface INewBookInfoStep {
  model: {
    isbn: string;
    numPages: number;
    title: string;
    author: string;
  };
  status: string;
  dirty: boolean;
  errors: {
    [key: string]: any;
  };
}

export interface NewBookPriceStep {
  model: {
    price: number;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: any;
  };
}

export interface INewBookState {
  step: NewBookStep;
  info: INewBookInfoStep;
  price: NewBookPriceStep;
}

export namespace NewBookActions {
  export class SelectStep {
    static readonly type = '[New Books] Select Step';
    constructor(readonly step: NewBookStep) {}
  }

  export class SubmitStep {
    static readonly type = '[New Books] Submit Step';
    constructor(readonly step: NewBookStep) {}
  }
}

@State<INewBookState>({
  name: 'new',
  defaults: {
    step: NewBookStep.INFO,
    info: {
      model: {
        isbn: '',
        numPages: 0,
        title: '',
        author: '',
      },
      status: '',
      dirty: false,
      errors: {},
    },
    price: {
      model: {
        price: 0,
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
  static step(state: INewBookState) {
    return state.step;
  }
  @Selector()
  static infoValid(state: INewBookState) {
    return state.info.status === 'VALID';
  }
  @Selector()
  static priceValid(state: INewBookState) {
    return state.price.status === 'VALID';
  }

  @Selector()
  static info(state: INewBookState) {
    return state.info;
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

  @Action(NewBookActions.SubmitStep)
  submitStep(
    ctx: StateContext<INewBookState>,
    action: NewBookActions.SubmitStep
  ) {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);

    const nextStep = steps[steps.indexOf(action.step) + 1];
    console.log(steps, nextStep);
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep,
      });
    }
  }
}
