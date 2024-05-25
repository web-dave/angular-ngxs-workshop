import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NewBookStateModel, NewBookStep } from './new-book.model';
import { NewBookCreated, NewBookSelectStep, NewBookSubmitStep } from './new-book.action';
import { Book, bookNa } from '../models';
import { BookApiService } from '../book-api.service';
import { concatMap, tap } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';

const defaults: NewBookStateModel = {
  step: NewBookStep.info,
  info: {
    model: {
      isbn: '',
      title: '',
      subtitle: '',
      author: '',
      abstract: '',
      cover: '',
      numPages: 0
    },
    dirty: false,
    status: '',
    errors: {}
  },
  price: {
    model: {
      price: 0
    },
    dirty: false,
    status: '',
    errors: {}
  }
};

@State<NewBookStateModel>({
  name: 'new',
  defaults
})
@Injectable()
export class NewBookState {
  service = inject(BookApiService);

  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }
  @Selector()
  static info(state: NewBookStateModel) {
    return state.info;
  }

  @Selector()
  static numPages(state: NewBookStateModel) {
    return state.info.model.numPages;
  }

  @Selector()
  static book(state: NewBookStateModel) {
    return { ...state.info.model, ...state.price.model } as Book;
  }

  @Action(NewBookSelectStep)
  setStep(ctx: StateContext<NewBookStateModel>, action: NewBookSelectStep) {
    ctx.patchState({ step: action.step });
  }
  @Action(NewBookSubmitStep)
  submitStep(ctx: StateContext<NewBookStateModel>, action: NewBookSubmitStep) {
    const state = ctx.getState();
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState({
        ...state,
        step: nextStep
      });
    } else {
      const invalidStep = steps.find(step => state[step].status !== 'VALID');
      if (invalidStep) {
        ctx.setState({
          ...state,
          step: invalidStep
        });
      } else {
        const book: Book = { ...bookNa(), ...state.info.model, ...state.price.model };
        return this.service.create(book).pipe(
          concatMap(created => {
            ctx.setState(defaults);
            return ctx.dispatch([new NewBookCreated(created), new Navigate(['/books'])]);
          })
        );
      }
    }
    return true;
  }
}
