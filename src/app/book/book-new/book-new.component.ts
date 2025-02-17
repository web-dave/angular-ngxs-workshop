import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { createBookStart } from '../store/book-collection.actions';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, NgIf, MatError, MatButton, RouterLink, MatLabel]
})
export class BookNewComponent {
  private readonly store = inject(Store);

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly bookService: BookApiService,
    private readonly destroyRef: DestroyRef
  ) {}

  create() {
    const book = { ...bookNa(), ...this.form.getRawValue() };
    this.store.dispatch(createBookStart({ book }));
  }
}
