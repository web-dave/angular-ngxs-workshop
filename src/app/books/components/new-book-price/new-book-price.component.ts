import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  NewBookActions,
  NewBookState,
  NewBookStep,
} from '../../state/new-book.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
const einValidator = (control: AbstractControl) =>
  control.value === 1 ? null : { eins: 'Argh! nix 1!' };
@Component({
  selector: 'ws-new-book-price',
  templateUrl: './new-book-price.component.html',
  styleUrls: ['./new-book-price.component.scss'],
})
export class NewBookPriceComponent implements OnInit {
  minPrice$ = this.store
    .select(NewBookState.numpages)
    .pipe(map((numPages) => (numPages >= 100 ? 10 : 0)));

  priceForm$ = this.minPrice$.pipe(
    map(
      (minAmount) =>
        new FormGroup({
          price: new FormControl(0, [
            Validators.required,
            einValidator,
            Validators.min(minAmount),
          ]),
        })
    )
  );
  form: any;

  constructor(private store: Store) {
    this.priceForm$.subscribe((data) => (this.form = data));
  }

  ngOnInit(): void {}
  submit() {
    this.store.dispatch(new NewBookActions.SubmitStep(NewBookStep.price));
  }
}
