import { inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { NewBookState } from '../../state/new.book.state';
import { first, map, take, tap } from 'rxjs/operators';

export const foo: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value !== 'foo'
    ? { foo: { expect: 'foo', got: control.value } }
    : null;
};

export const asyncFoo = (store: Store): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    console.log('AsyncFoooooooooo');

    return store.select(NewBookState.info).pipe(
      map((data) =>
        data.model.numPages !== 7
          ? { foo: { expect: '7', got: control.value } }
          : null
      ),
      tap((data) => console.log('====>', data)),
      take(1)
    );
    // return of(
    //   control.value !== 12345678901
    //     ? { foo: { expect: '12345678901', got: control.value } }
    //     : null
    // );
  };
};
