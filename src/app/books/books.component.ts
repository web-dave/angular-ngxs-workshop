import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { BookActions, BookState } from './state/book.state';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  constructor(
    private store: Store,
    private actions$: Actions,
    private snackBAr: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.actions$.pipe(ofActionSuccessful(BookActions.LoadAll)).subscribe({
      next: () => {
        this.snackBAr.open('Yeah! HAt geklappt 🦄', 'Cool', { duration: 2000 });
      },
    });
    this.store.dispatch(new BookActions.LoadAll());
    this.store
      .select(BookState.bookState)
      .subscribe((data) => console.log(data));
  }
}
