import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, first, map, of, switchMap, tap, timer } from 'rxjs';
import { BookCollectionState } from '../../state/book-collection.state';

// Change.pipe(switchMap(isbnValidator));

export const isbnValidator = (): AsyncValidatorFn => {
  const store = inject(Store);
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const isbn: string = control.value;
    console.log(isbn);
    return timer(500).pipe(
      switchMap(() =>
        store.select(BookCollectionState.entity(isbn)).pipe(
          tap(data => console.log('===>', data)),
          first(),
          map(data => {
            if (data) {
              return { isbn: isbn + ' wird schon verwendet!' };
            } else {
              return null;
            }
          })
        )
      )
    );
    return store.select(BookCollectionState.entity(isbn)).pipe(
      first(),
      map(data => {
        if (data) {
          return { isbn: isbn + ' wird schon verwendet!' };
        } else {
          return null;
        }
      })
    );
    // isbn => frag den State
  };
};
