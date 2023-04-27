import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewBookState } from '../../state/new-book/new-book.state';
import { Select, Store } from '@ngxs/store';
import { NewBookActions } from '../../state/new-book/new-book.actions';
import { NewBookStep } from '../../state/new-book/new-book.models';

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
