import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  NewBookActions,
  NewBookState,
  NewBookStep,
} from '../../state/new-book.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'ws-new-book-price',
  templateUrl: './new-book-price.component.html',
  styleUrls: ['./new-book-price.component.scss'],
})
export class NewBookPriceComponent implements OnInit {
  minPrice$ = this.store
    .select(NewBookState.numpages)
    .pipe(map((numPages) => (numPages >= 99 ? 10 : 0)));

  priceForm$ = this.minPrice$.pipe(
    map(
      (minAmount) =>
        new FormGroup({
          price: new FormControl(0, [
            Validators.required,
            Validators.min(minAmount),
          ]),
        })
    )
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
