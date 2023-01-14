import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import {
  NewBookAction,
  NewBookState,
  NewBookStep,
} from '../../state/new.book.state';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'ws-new-book-price',
  templateUrl: './new-book-price.component.html',
  styleUrls: ['./new-book-price.component.scss'],
})
export class NewBookPriceComponent implements OnInit {
  priceForm$ = this.store.select(NewBookState.info).pipe(
    map((info) => {
      const minPrice = info.model.numPages > 100 ? 10 : 0;
      return new FormGroup({
        price: new FormControl(0, [
          Validators.required,
          Validators.min(minPrice),
        ]),
      });
    })
  );
  constructor(private store: Store) {}

  ngOnInit(): void {}

  submit(): void {
    this.store.dispatch(new NewBookAction.SubmitStep(NewBookStep.PRICE));
  }
}
