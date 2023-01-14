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
  export class SubmitStep {
    static readonly type = '[Books New] submit step';
    constructor(public step: NewBookStep) {}
  }
}

export enum NewBookStep {
  INFO = 'info',
  PRICE = 'price',
}

export interface NewBookInfoStepModel {
  model: {
    id: string;
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
  errors: {
    [key: string]: any;
  };
}
export interface NewBookPriceStepModel {
  model: {
    price: string;
  };
  dirty: boolean;
  status: string;
  errors: {
    [key: string]: any;
  };
}
export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStepModel;
  price: NewBookPriceStepModel;
}

@State<NewBookStateModel>({
  name: 'new',
  defaults: {
    step: NewBookStep.INFO,
    info: {
      dirty: false,
      errors: {},
      status: '',
      model: {
        abstract: '',
        author: '',
        cover: '',
        id: '',
        isbn: '',
        numPages: 0,
        publisher: '',
        subtitle: '',
        title: '',
      },
    },
    price: {
      dirty: false,
      errors: {},
      status: '',
      model: {
        price: '',
      },
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
  static info(state: NewBookStateModel) {
    return state.info;
  }
  @Selector()
  static infoModel(state: NewBookStateModel) {
    return state.info.model;
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

  @Action(NewBookAction.SubmitStep)
  submitStep(
    ctx: StateContext<NewBookStateModel>,
    action: NewBookAction.SubmitStep
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
}
