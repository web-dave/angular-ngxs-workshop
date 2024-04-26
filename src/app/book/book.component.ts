import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { BookLoadAll } from './state/book-collection.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class BookComponent {
  snackBar = inject(MatSnackBar);
  store = inject(Store)
    .dispatch(new BookLoadAll())
    .subscribe({
      next: () => this.snackBar.open('Yay, Booooooks', 'thx')
    });
}
