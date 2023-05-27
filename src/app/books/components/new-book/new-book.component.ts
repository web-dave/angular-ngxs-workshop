import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
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
export class NewBookComponent implements OnInit {
  NewBookStep = NewBookStep;
  @Select(NewBookState.step)
  step$!: Observable<NewBookStep>;
  btns = Object.values(NewBookStep);
  constructor(private store: Store) {}

  ngOnInit(): void {}
  selectStep(v: NewBookStep) {
    this.store.dispatch(new NewBookActions.SelectStep(v));
  }
}
