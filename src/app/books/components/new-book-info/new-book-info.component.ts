import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { NewBookActions, NewBookStep } from '../../state/new-book.state';
import { Observable, of } from 'rxjs';
import { BookApiService } from '../../services/book-api.service';
import {
  catchError,
  debounceTime,
  delay,
  map,
  switchMap,
  throttleTime,
} from 'rxjs/operators';

const asycIsbnValidator =
  (service: BookApiService): AsyncValidatorFn =>
  (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      debounceTime(1500),
      switchMap((value) =>
        service.one(value).pipe(
          map(() => ({ asyncIsbn: 'knarf!' })),
          catchError(() => of(null))
        )
      )
    );
  };

@Component({
  selector: 'ws-new-book-info',
  templateUrl: './new-book-info.component.html',
  styleUrls: ['./new-book-info.component.scss'],
})
export class NewBookInfoComponent implements OnInit {
  infoForm = this.formBuilder.group({
    id: '',
    isbn: [
      '',
      [Validators.required, Validators.minLength(3)],
      [asycIsbnValidator(this.service)],
    ],
    title: ['', [Validators.required]],
    subtitle: '',
    cover: '',
    author: ['', [Validators.required]],
    abstract: '',
    numPages: [0, [Validators.required, Validators.min(1)]],
    publisher: '',
  });
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private service: BookApiService
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.store.dispatch(new NewBookActions.SubmitStep(NewBookStep.info));
  }
}
