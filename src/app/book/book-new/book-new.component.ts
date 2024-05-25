import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewBookStep } from '../state/new-book.model';
import { Select, Store } from '@ngxs/store';
import { NewBookState } from '../state/new-book.state';
import { Observable } from 'rxjs';
import { NewBookSelectStep } from '../state/new-book.action';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatError,
    MatButton,
    RouterLink,
    MatLabel,
    JsonPipe,
    AsyncPipe,
    MatButtonToggleModule
  ]
})
export class BookNewComponent {
  NewBookStep = NewBookStep;
  @Select(NewBookState.step)
  step$!: Observable<NewBookStep>;
  store = inject(Store);

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookSelectStep(step));
  }

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
