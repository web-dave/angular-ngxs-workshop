import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgxsFormDirective } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../../state/new-book.actions';
import { NewBookStep } from '../../state/new-book.model';
import { Observable, map } from 'rxjs';
import { NewBookState } from '../../state/new-book.state';

@Component({
  selector: 'ws-book-new-price',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    NgxsFormDirective,
    MatInput,
    MatError,
    MatButton,
    RouterLink,
    MatLabel,
    AsyncPipe
  ],
  templateUrl: './book-new-price.component.html',
  styleUrl: './book-new-price.component.scss'
})
export class BookNewPriceComponent {
  store = inject(Store);
  formBuilder = inject(NonNullableFormBuilder);
  minPrice = 0;

  form$: Observable<FormGroup<{ price: FormControl<number> }>> = this.store.select(NewBookState.info).pipe(
    map(info => info.model.numPages),
    map(numPages => {
      this.minPrice = numPages >= 100 ? 10 : 0;
      return this.formBuilder.group({
        price: [0, [Validators.required, Validators.min(this.minPrice)]]
      });
    })
  );

  submit(): void {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.price));
  }
}
