import { Injectable, inject } from '@angular/core';
import { NewBookStateModel, NewBookStep } from './new-book.model';
import { Action, Selector, State, StateContext,  } from '@ngxs/store';
import { NewBookAdd, NewBookSelectStep, NewBookSubmitStep } from './new-book.actions';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { EMPTY, first, pipe, tap } from 'rxjs';
import { BookLoadAll } from './book-collection.actions';

const infoDefault = {
  model: {
    title: '',
    subtitle: '',
    author: '',
    abstract: '',
    isbn: '',
    cover: '',
    numPages: 0
  },
  status: 'INVALID',
  dirty: false
};
const priceDefault = {
  model: {
    price: 0
  },
  status: 'INVALID',
  dirty: false
};

@State<NewBookStateModel>({
  name: 'newBook',
  defaults: {
    step: NewBookStep.info,
    info: infoDefault,
    price: priceDefault
  }
})
@Injectable()
export class NewBookState {
  service = inject(BookApiService)
  @Action(NewBookSelectStep)
  setStep(ctx: StateContext<NewBookStateModel>, action: NewBookSelectStep) {
    ctx.setState(state => ({
      ...state,
      step: action.step
    }));
  }

  @Action(NewBookSubmitStep)
  submitStep(ctx: StateContext<NewBookStateModel>, action: NewBookSubmitStep) {
    const steps = Object.values(NewBookStep);
    const nextStep = steps[steps.indexOf(action.step) + 1];
    if (nextStep) {
      ctx.setState(state => ({
        ...state,
        step: nextStep
      }));
      return EMPTY
    } else{
      const book = {
        ...ctx.getState().info.model,
        ...ctx.getState().price.model
      } as Book
      // // return 
      // this.service.create(book).pipe(first()).subscribe(data =>{
      //   ctx.dispatch(new BookLoadAll())
      // })
      return this.service.create(book).pipe( tap(data =>ctx.dispatch(new NewBookAdd(data))))
    }
  }

  @Selector()
  static step(state: NewBookStateModel) {
    return state.step;
  }

  @Selector()
  static info(state: NewBookStateModel){
    return state.info
  }
}
