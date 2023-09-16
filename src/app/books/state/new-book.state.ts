import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Book } from '../models/book';
import { BookApiService } from '../services/book-api.service';
import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export enum NewBookStep {
  info = 'info',
  price = 'price',
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

export interface NewBookStateModel {
  step: NewBookStep;
  info: NewBookInfoStepModel;
  price: NewBookPriceStep;
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

  export class Created {
    static type = '[NEW BOOK] Created';
    constructor(readonly book: Book) {}
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
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Selector()
  static infoStatus(state: NewBookStateModel) {
    return state?.info?.status;
  }

  @Selector()
  static info(state: NewBookStateModel) {
    return state.info;
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
  ): void | Observable<void> {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep,
      });
    } else {
      const invalidStep = steps.find((step) => {
        const status = state[step].status;
        return status !== 'VALID';
      });
      if (invalidStep) {
        ctx.setState({
          ...state,
          step: invalidStep,
        });
      } else {
        return this.service
          .create({
            ...state.info.model,
            price: state.price.model.price.toString(),
          })
          .pipe(
            concatMap((created) => {
              // ctx.setState(defaults);
              return ctx.dispatch([
                new NewBookActions.Created(created),
                new Navigate(['/books']),
              ]);
            })
          );
      }
    }
  }

  constructor(private service: BookApiService) {
    console.log('NewBookState');
  }
}
