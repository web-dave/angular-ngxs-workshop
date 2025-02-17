import { Component, DestroyRef, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { MatButton } from '@angular/material/button';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateBookStart } from '../store/book-collection.actions';

@Component({
  selector: 'ws-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatError, MatButton, RouterLink, AsyncPipe]
})
export class BookEditComponent {
  protected book$: Observable<Book> = EMPTY;
  protected isbnValue = '';

  store = inject(Store);

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: [''],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly bookService: BookApiService,
    private readonly destroyRef: DestroyRef
  ) {}

  @Input({ required: true })
  set isbn(isbn: string) {
    this.book$ = this.bookService.getByIsbn(isbn).pipe(
      tap(book => {
        this.form.setValue({
          title: book.title,
          subtitle: book.subtitle,
          author: book.author,
          abstract: book.abstract,
          isbn: book.isbn,
          cover: book.cover,
          numPages: book.numPages
        });
      })
    );
    this.isbnValue = isbn;
  }

  save() {
    this.store.dispatch(updateBookStart({ book: this.form.getRawValue() as Book }));
  }
}
