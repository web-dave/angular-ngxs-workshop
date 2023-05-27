import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NewBookActions, NewBookStep } from '../../state/new-book.state';

@Component({
  selector: 'ws-new-book-info',
  templateUrl: './new-book-info.component.html',
  styleUrls: ['./new-book-info.component.scss'],
})
export class NewBookInfoComponent implements OnInit {
  infoForm = this.formBuilder.group({
    id: '',
    isbn: ['', [Validators.required, Validators.minLength(3)], []],
    title: ['', [Validators.required]],
    subtitle: '',
    cover: '',
    author: ['', [Validators.required]],
    abstract: '',
    numPages: [0, [Validators.required, Validators.min(1)]],
    publisher: '',
  });
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {}

  submit(): void {
    this.store.dispatch(new NewBookActions.SubmitStep(NewBookStep.info));
  }
}
