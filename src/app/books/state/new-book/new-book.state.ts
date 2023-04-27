import { Injectable } from '@angular/core';
import { State, StateContext, Selector, Action } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Book } from '../../models/book';
import { BookApiService } from '../../services/book-api.service';
import { BookActions } from '../book.state';
import { NewBookActions } from './new-book.actions';
import { NewBookStateModel, NewBookStep } from './new-book.models';

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
  ): void | Observable<any> {
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
      return this.service
        .create({
          ...state.info.model,
          price: '$' + state.price.model.price,
        })
        .pipe(
          concatMap((book) => ctx.dispatch(new NewBookActions.Created(book)))
        );
      //set State
    }
  }

  constructor(private service: BookApiService) {}
}
