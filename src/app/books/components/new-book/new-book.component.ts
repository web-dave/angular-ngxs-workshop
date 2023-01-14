import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NewBookAction,
  NewBookState,
  NewBookStep,
} from '../../state/new.book.state';
import { Select, Store } from '@ngxs/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ws-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {
  NewBookStep = NewBookStep;
  @Select(NewBookState.step)
  step$!: Observable<NewBookStep>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookAction.SelectStep(step));
  }
}
