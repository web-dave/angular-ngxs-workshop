import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NewBookStep,
  NewBookState,
  NewBookActions,
} from '../../state/new-book.state';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'ws-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {
  @Select(NewBookState.step)
  step$!: Observable<NewBookStep>;

  newBookStep = NewBookStep;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookActions.SetStep(step));
  }
}
