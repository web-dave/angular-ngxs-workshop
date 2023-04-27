import { Injectable } from '@angular/core';
import { State, StateContext, Selector, Action } from '@ngxs/store';

export interface NewBookPriceStepModel {
  model: {
    price: number;
  };
  dirty: boolean;
  status: string;
  error: {
    [key: string]: any;
  };
}
export interface NewBookInfoStepModel {
  model: {
    isbn: string;
    title: string;
    subtitle: string;
    cover: string;
    author: string;
    abstract: string;
    numPages: number;
    publisher: string;
  };
  dirty: boolean;
  status: string;
  error: {
    [key: string]: any;
  };
}

export enum NewBookStep {
  info = 'INFO',
  price = 'PRICE',
}
export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStepModel;
  price: NewBookPriceStepModel;
}

export namespace NewBookActions {
  export class SetStep {
    static type = '[NEW BOOK] select Step';
    constructor(public step: NewBookStep) {}
  }

  export class SubmitStep {
    static type = '[NEW BOOK] submit step';
    constructor(public step: NewBookStep) {}
  }
}

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.info,
    info: {
      model: {
        isbn: '',
        title: '',
        subtitle: '',
        cover: '',
        author: '',
        abstract: '',
        numPages: 0,
        publisher: '',
      },
      dirty: false,
      status: '',
      error: {},
    },
    price: {
      model: {
        price: 0,
      },
      dirty: false,
      error: {},
      status: '',
    },
  },
})
@Injectable()
export class NewBookState {
  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Selector()
  static numPages(state: NewBookStateModel) {
    return state.info.model.numPages;
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
    } else {
      //crete book
      //set State
    }
  }
}
