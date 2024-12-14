import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NewBookState } from '../state/new-book.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgxsFormDirective } from '@ngxs/form-plugin';

@Component({
  selector: 'ws-book-new-price-step',
  standalone: true,
  imports: [MatFormField, MatInput, MatError, ReactiveFormsModule, NgxsFormDirective],
  templateUrl: './book-new-price-step.component.html',
  styleUrl: './book-new-price-step.component.scss'
})
export class BookNewPriceStepComponent {
  form = new FormGroup({
    price: new FormControl(0, { validators: [Validators.required] })
  });
  sub = inject(Store)
    .select(NewBookState.info)
    .pipe(
      takeUntilDestroyed(),
      map(infoStep => infoStep.model.numPages),
      map(numPages => (numPages > 100 ? 10 : 0))
    )
    .subscribe(minP => {
      this.form.controls.price.removeValidators(Validators.min(0));
      this.form.controls.price.addValidators(Validators.min(minP));
    });
}
