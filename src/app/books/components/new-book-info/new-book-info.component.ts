import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewBookAction, NewBookStep } from '../../state/new.book.state';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'ws-new-book-info',
  templateUrl: './new-book-info.component.html',
  styleUrls: ['./new-book-info.component.scss'],
})
export class NewBookInfoComponent implements OnInit {
  infoForm = new FormGroup({
    isbn: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numPages: new FormControl('', [Validators.required, Validators.min(1)]),
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
  });
  constructor(private store: Store) {}

  ngOnInit(): void {}

  submit(): void {
    this.store.dispatch(new NewBookAction.SubmitStep(NewBookStep.INFO));
  }
}
