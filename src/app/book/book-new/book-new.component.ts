import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { NewBookState } from '../state/new-book.state';
import { NewBookStep } from '../state/new-book.models';
import { NewBookSelectStep } from '../state/new-book.actions';
import { NewBookInfoComponent } from './new-book/new-book-info.component';
import { NewBookPriceComponent } from './new-book/new-book-price.component';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    NewBookInfoComponent,
    NewBookPriceComponent,
    AsyncPipe
  ]
})
export class BookNewComponent {
  private readonly store = inject(Store);
  step$ = this.store.select(NewBookState.step);
  NewBookStep = NewBookStep;

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookSelectStep(step));
  }

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
    this.bookService
      .create(book)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigateByUrl('/'))
      )
      .subscribe();
  }
}
