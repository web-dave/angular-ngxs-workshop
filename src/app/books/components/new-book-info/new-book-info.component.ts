import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  NewBookAction,
  NewBookState,
  NewBookStep,
} from '../../state/new.book.state';
import { Select, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ws-new-book-info',
  templateUrl: './new-book-info.component.html',
  styleUrls: ['./new-book-info.component.scss'],
})
export class NewBookInfoComponent implements OnInit {
  // infoForm = new FormGroup({
  //   isbn: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   numPages: new FormControl('', [Validators.required, Validators.min(1)]),
  //   title: new FormControl('', [Validators.required]),
  //   author: new FormControl('', [Validators.required]),
  // });

  infoForm = new FormGroup({
    abstract: new FormControl(''),
    author: new FormControl(''),
    cover: new FormControl(''),
    id: new FormControl(''),
    isbn: new FormControl(''),
    numPages: new FormControl(0),
    publisher: new FormControl(''),
    subtitle: new FormControl(''),
    title: new FormControl(''),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {}

  submit(): void {
    this.store.dispatch(new NewBookAction.SubmitStep(NewBookStep.INFO));
  }
}
