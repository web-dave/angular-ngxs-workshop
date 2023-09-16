import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  NewBookActions,
  NewBookStep,
} from 'src/app/books/state/new-book.state';

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

  submit(): void {
    this.store.dispatch(new NewBookActions.SubmitStep(NewBookStep.info));
  }

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
