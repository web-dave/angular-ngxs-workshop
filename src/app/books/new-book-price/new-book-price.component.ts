import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  NewBookState,
  NewBookActions,
  NewBookStep,
} from '../state/new.book.state';

@Component({
  selector: 'ws-new-book-price',
  templateUrl: './new-book-price.component.html',
  styleUrls: ['./new-book-price.component.scss'],
})
export class NewBookPriceComponent implements OnInit {
  priceForm$: Observable<FormGroup>;

  constructor(private store: Store) {
    this.priceForm$ = this.store.select(NewBookState.info).pipe(
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
  }
  submit(): void {
    this.store.dispatch(new NewBookActions.SubmitStep(NewBookStep.PRICE));
  }

  ngOnInit(): void {}
}
