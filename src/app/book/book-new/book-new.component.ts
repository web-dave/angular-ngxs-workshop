import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BookApiService } from '../book-api.service';
import { bookNa } from '../models';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewBookStep } from '../state/new-book.model';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { NewBookSelectStep } from '../state/new-book.actions';
import { NewBookState } from '../state/new-book.state';
import { BookNewInfoComponent } from './book-new-info/book-new-info.component';
import { BookNewPriceComponent } from './book-new-price/book-new-price.component';

@Component({
  selector: 'ws-book-new',
  styleUrls: ['./book-new.component.scss'],
  templateUrl: './book-new.component.html',
  standalone: true,
  imports: [BookNewInfoComponent, BookNewPriceComponent, MatButtonToggle, MatButtonToggleGroup, AsyncPipe]
})
export class BookNewComponent {
  NewBookStep = NewBookStep;

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookApiService);
  private readonly destroyRef = inject(DestroyRef);
  private store = inject(Store);

  protected form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    subtitle: [''],
    author: ['', [Validators.required]],
    abstract: [''],
    isbn: ['', [Validators.required, Validators.minLength(3)]],
    cover: [''],
    numPages: [0, [Validators.required, Validators.min(10)]]
  });

  @Select(NewBookState.currentStep)
  step$!: Observable<NewBookStep>;

  selectStep(step: NewBookStep) {
    this.store.dispatch(new NewBookSelectStep(step));
  }
}
