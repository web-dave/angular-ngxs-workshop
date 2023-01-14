import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { BooksActions } from './state/books.state';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  constructor(private store: Store, private snackBAr: MatSnackBar) {}

  ngOnInit(): void {
    this.store
      .dispatch(new BooksActions.LoadAll())
      .subscribe(() => this.snackBAr.open('Yeah!', 'close'));
  }
}
