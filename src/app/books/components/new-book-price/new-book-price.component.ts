import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { NewBookActions } from '../../state/new-book/new-book.actions';
import { NewBookStep } from '../../state/new-book/new-book.models';
import { NewBookState } from '../../state/new-book/new-book.state';

@Component({
  selector: 'ws-new-book-price',
  templateUrl: './new-book-price.component.html',
  styleUrls: ['./new-book-price.component.scss'],
})
export class NewBookPriceComponent implements OnInit {
  priceForm$ = this.store.select(NewBookState.numPages).pipe(
    map((p) => (p > 100 ? 10 : 0)),
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
  // ngAfterViewChecked(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    const f = new FormGroup({});
    f.updateValueAndValidity();
  }

  submit() {
    this.store.dispatch(new NewBookActions.SubmitStep(NewBookStep.price));
  }
}
