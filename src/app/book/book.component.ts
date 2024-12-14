import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { BookLoadAll } from './state/book-collection.actions';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ws-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule]
})
export class BookComponent implements OnInit {
  snackBar = inject(MatSnackBar);
  store = inject(Store);
  dRef = inject(DestroyRef);

  ngOnInit(): void {
    this.store
      .dispatch(new BookLoadAll())
      .pipe(takeUntilDestroyed(this.dRef))
      .subscribe(() => this.snackBar.open('Tadaaaa!', 'Yeah!', { duration: 2000 }));
  }
  // sub = inject(Store)
  //   .dispatch(new BookLoadAll())
  //   .pipe(takeUntilDestroyed())
  //   .subscribe(() => this.snackBar.open('Tadaaaa!', 'Yeah!', { duration: 2000 }));
}
