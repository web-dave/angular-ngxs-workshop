import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { NewBookActions } from '../../state/new-book/new-book.actions';
import { NewBookStep } from '../../state/new-book/new-book.models';

@Component({
  selector: 'ws-new-book-info',
  templateUrl: './new-book-info.component.html',
  styleUrls: ['./new-book-info.component.scss'],
})
export class NewBookInfoComponent implements OnInit {
  infoForm = new FormGroup({
    isbn: new FormControl('', [Validators.required]),
    title: new FormControl(''),
    subtitle: new FormControl(''),
    cover: new FormControl(''),
    author: new FormControl(''),
    abstract: new FormControl(''),
    numPages: new FormControl(0),
    publisher: new FormControl(''),
  });
  constructor(private store: Store) {}

  ngOnInit(): void {}

  submit() {
    this.store.dispatch(new NewBookActions.SubmitStep(NewBookStep.info));
  }
}
