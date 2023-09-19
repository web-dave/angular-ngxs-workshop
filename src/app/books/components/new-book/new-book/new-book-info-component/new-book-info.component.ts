import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { MonoTypeOperatorFunction, Observable, of, pipe, timer } from 'rxjs';
import {
  catchError,
  debounce,
  debounceTime,
  delay,
  first,
  map,
  switchMap,
} from 'rxjs/operators';
import { BookApiService } from 'src/app/books/services/book-api.service';
import {
  NewBookActions,
  NewBookStep,
} from 'src/app/books/state/new-book.state';

const AuthorValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  // return of(
  //   control.value === 'Dave'
  //     ? null
  //     : {
  //         author: 'Nicht Dave!!!!!',
  //       }
  // );
  console.log('AuthorValidator', control.value);
  if (control.value === 'Dave') {
    return null;
  }
  return {
    author: 'Nicht Dave!!!!!',
  };
};

const myOperator = (): MonoTypeOperatorFunction<any> =>
  pipe(
    debounceTime(1500),
    map((value: string) => value.toUpperCase())
  );

const asyncISBNValidator =
  (service: BookApiService): AsyncValidatorFn =>
  (control: AbstractControl): Observable<ValidationErrors | null> =>
    control.valueChanges.pipe(
      myOperator(),

      switchMap((isbn) => service.one(isbn)),
      map((book) => ({
        isbnExist: `${book.isbn} existiert bereits und ist an '${book.title}' vergeben`,
      })),
      catchError((err) => of(null)),
      first()
    );
@Component({
  selector: 'ws-new-book-info',
  templateUrl: './new-book-info.component.html',
  styleUrls: ['./new-book-info.component.scss'],
})
export class NewBookInfoComponent implements OnInit {
  infoForm = new FormGroup({
    isbn: new FormControl(
      '',
      [Validators.required, Validators.minLength(3)],
      [asyncISBNValidator(this.service)]
    ),
    numPages: new FormControl('', [Validators.required, Validators.min(1)]),
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required, AuthorValidator]),
  });

  submit(): void {
    this.store.dispatch(new NewBookActions.SubmitStep(NewBookStep.info));
  }

  constructor(private store: Store, private service: BookApiService) {}

  ngOnInit(): void {}
}
