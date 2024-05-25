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
import { NewBookSelectStep, NewBookSubmitStep } from '../state/new-book.action';
import { NgxsFormDirective } from '@ngxs/form-plugin';
import { InfoComponent } from './info/info.component';
import { PriceComponent } from './price/price.component';

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
    MatButtonToggleModule,
    NgxsFormDirective,
    InfoComponent,
    PriceComponent
  ]
})
export class BookNewComponent {
  NewBookStep = NewBookStep;
  @Select(NewBookState.step)
  step$!: Observable<NewBookStep>;
  store = inject(Store);

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
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.info));

    // const book = { ...bookNa(), ...this.form.getRawValue() };
    // this.bookService
    //   .create(book)
    //   .pipe(
    //     takeUntilDestroyed(this.destroyRef),
    //     tap(() => this.router.navigateByUrl('/'))
    //   )
    //   .subscribe();
  }
}
