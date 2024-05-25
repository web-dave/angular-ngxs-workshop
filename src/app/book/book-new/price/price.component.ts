import { NgIf, JsonPipe, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgxsFormDirective } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { NewBookSubmitStep } from '../../state/new-book.action';
import { NewBookStep } from '../../state/new-book.model';
import { NewBookState } from '../../state/new-book.state';
import { map } from 'rxjs';

@Component({
  selector: 'ws-price',
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
    NgxsFormDirective
  ],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss'
})
export class PriceComponent {
  formPath = 'bookCollection.new.price';
  store = inject(Store);
  formBuilder = inject(NonNullableFormBuilder);
  form$ = this.store.select(NewBookState.numPages).pipe(
    map(num => {
      const minPrice = num >= 100 ? 10 : 0;
      return this.formBuilder.group({
        price: [0, [Validators.required, Validators.min(minPrice)]]
      });
    })
  );
  submit() {
    this.store.dispatch(new NewBookSubmitStep(NewBookStep.price));
  }
}
