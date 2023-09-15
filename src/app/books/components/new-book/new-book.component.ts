import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import {
  NewBookActions,
  NewBookState,
  NewBookStep,
} from '../../state/new-book.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'ws-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent {
  NewBookStep = NewBookStep;

  @Select(NewBookState.step)
  step$!: Observable<NewBookStep>;

  constructor(private store: Store) {}

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookActions.SelectStep(step));
  }
}
