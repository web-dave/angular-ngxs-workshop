import { Component, DestroyRef, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { MatButton } from '@angular/material/button';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { BookCollectionState } from '../state/book-collection.state';

const dollarValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return (control as FormControl<string>).value.includes('$') ? { dollar: 'Bitte kein $ Zeichen verwenden!' } : null;
};

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatError, MatButton, RouterLink, AsyncPipe]
})
export class BookEditComponent {
  protected book$: Observable<Book> = EMPTY;

  store = inject(Store);
  route = inject(ActivatedRoute);

  formBuilder = inject(NonNullableFormBuilder);
  // protected book$?: Observable<Book>;
  isbnValue = '';

  form$ = this.route.params.pipe(
    switchMap(({ isbn }) =>
      this.store.select(BookCollectionState.entity(isbn)).pipe(filter((book): book is Book => !!book))
    ),
    map(book =>
      this.formBuilder.group({
        title: [book.title, [dollarValidator]],
        subtitle: book.subtitle,
        author: book.author,
        abstract: book.abstract,
        isbn: book.isbn,
        cover: book.cover,
        numPages: book.numPages
      })
    )
  );

  @Input({ required: true })
  set isbn(isbn: string) {
    // this.book$ = this.store.select(BookCollectionState.entity(isbn)).pipe(filter((book): book is Book => !!book),
    // tap(book => {
    //         this.form.setValue({
    //           title: book.title,
    //           subtitle: book.subtitle,
    //           author: book.author,
    //           abstract: book.abstract,
    //           isbn: book.isbn,
    //           cover: book.cover,
    //           numPages: book.numPages
    //         });
    //       }));
    this.isbnValue = isbn;
  }

  // protected form = this.formBuilder.nonNullable.group({
  //   title: ['Hallo Welt', [Validators.required]],
  //   subtitle: [''],
  //   author: ['', [Validators.required]],
  //   abstract: [''],
  //   isbn: [''],
  //   cover: [''],
  //   numPages: [0, [Validators.required, Validators.min(10)]]
  // });

  constructor(
    private readonly bookService: BookApiService,
    private readonly destroyRef: DestroyRef
  ) {}

  // @Input({ required: true })
  // set isbn(isbn: string) {
  //   this.book$ = this.bookService.getByIsbn(isbn).pipe(
  //     tap(book => {
  //       this.form.setValue({
  //         title: book.title,
  //         subtitle: book.subtitle,
  //         author: book.author,
  //         abstract: book.abstract,
  //         isbn: book.isbn,
  //         cover: book.cover,
  //         numPages: book.numPages
  //       });
  //     })
  //   );
  //   this.isbnValue = isbn;
  // }

  save() {
    // this.bookService
    //   .update(this.isbnValue, this.form.getRawValue() as any)
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe();
  }
  reset(form: FormGroup<any>) {
    form.reset();
    console.log(form.getRawValue());
  }
}
