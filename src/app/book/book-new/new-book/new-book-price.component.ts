import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/form-field';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../../state/new-book.actions';
import { NewBookStep } from '../../state/new-book.models';
import { NgxsFormDirective } from '@ngxs/form-plugin';
import { NewBookState } from '../../state/new-book.state';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ws-book-new-price',
  template: `
    @if (form$ | async; as form) {
      <form [formGroup]="form" (ngSubmit)="submit()" ngxsForm="bookState.new.price" class="book-new__form">
        <mat-form-field>
          <input matInput type="number" formControlName="price" placeholder="Price" required />
          @if (form.hasError('min', 'price')) {
            <mat-error> Price is too low ({{ form.getError('min', 'price').min }}) </mat-error>
          }
          @if (form.hasError('min', 'required')) {
            <mat-error *ngIf="form.hasError('min', 'required')"> Price is required </mat-error>
          }
        </mat-form-field>
        <div>
          <button mat-raised-button color="primary" [disabled]="!form.valid" type="submit">Submit</button>
        </div>
      </form>
    }
  `,
  styles: `
    .mat-h2 {
      margin-top: 24px;
      margin-left: 24px;
    }

    .book-new__form {
      margin-left: 24px;

      mat-form-field {
        display: block;
      }
    }

    .form-actions {
      margin-top: 1rem;
    }
  `,
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatError, MatButton, AsyncPipe, NgxsFormDirective]
})
export class NewBookPriceComponent {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  form$ = this.store.select(NewBookState.info).pipe(
    map(info => info.model.numPages),
    map(pages => (pages >= 100 ? 10 : 0)),
    map(min =>
      this.formBuilder.group({
        price: [0, [Validators.required, Validators.min(min)]]
      })
    )
  );
  submit() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.price));
  }
}
