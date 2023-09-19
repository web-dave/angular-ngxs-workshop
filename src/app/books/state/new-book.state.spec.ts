import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { BooksState } from './books.state';
// import {firstValueFrom} from 'rxjs';
import {
  NewBookActions,
  NewBookState,
  NewBookStateModel,
  NewBookStep,
} from './new-book.state';
import { HttpClientModule } from '@angular/common/http';

describe('New Book Step', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([BooksState, NewBookState]),
      ],
    });

    store = TestBed.inject(Store);
  });

  it('it toggles step price', () => {
    store.dispatch(new NewBookActions.SelectStep(NewBookStep.price));

    expect(store.selectSnapshot(NewBookState.step)).toBe('price');
  });

  it('it toggles step info', () => {
    store.dispatch(new NewBookActions.SelectStep(NewBookStep.info));

    expect(store.selectSnapshot(NewBookState.step)).toBe(NewBookStep.info);
  });
  //   it('it toggles step', waitForAsync(() => {
  //     store
  //       .dispatch(new NewBookActions.SelectStep(NewBookStep.price))
  //       .toPromise();
  //     const step = store.select(NewBookState.step).toPromise();
  //     expectAsync(step).toBeResolvedTo(NewBookStep.price);
  //   }));
});
